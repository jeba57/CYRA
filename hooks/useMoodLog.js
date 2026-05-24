// hooks/useMoodLog.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export function useMoodLog(days = 30) {
  const { data: session } = useSession();
  const [logs,    setLogs]    = useState([]);
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [saving,  setSaving]  = useState(false);

  const fetchLogs = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res  = await fetch(`/api/mood?days=${days}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setLogs(data.logs);
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, days]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const saveLog = useCallback(async ({ mood, energy, pain, notes, tags }) => {
    setSaving(true);
    try {
      const res  = await fetch("/api/mood", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ mood, energy, pain, notes, tags }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchLogs();
      return data.log;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [fetchLogs]);

  // Build bloom grid — which days in the last 30 had logs
  const bloomData = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key    = d.toISOString().split("T")[0];
    const logged = logs.find(l => l.date?.startsWith(key));
    return { day: i + 1, logged: !!logged, mood: logged?.mood || 0 };
  });

  return { logs, stats, loading, saving, error, saveLog, fetchLogs, bloomData };
}