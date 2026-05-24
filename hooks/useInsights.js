// hooks/useInsights.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export function useInsights() {
  const { data: session } = useSession();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchInsights = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/insights");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { fetchInsights(); }, [fetchInsights]);

  return { data, loading, error, fetchInsights };
}