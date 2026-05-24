// hooks/useCycleData.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export function useCycleData() {
  const { data: session } = useSession();
  const [cycles,  setCycles]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // Fetch all cycles from API
  const fetchCycles = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/cycle");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCycles(data.cycles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { fetchCycles(); }, [fetchCycles]);

  // Save / update a cycle
  const saveCycle = useCallback(async (cycleData) => {
    try {
      const res  = await fetch("/api/cycle", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(cycleData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchCycles(); // refresh list
      return data.cycle;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchCycles]);

  // Delete a cycle
  const deleteCycle = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/cycle/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setCycles(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Computed values from latest cycle
  const latest          = cycles[0] || null;
  const cycleLength     = cycles.find(c => c.cycleLength)?.cycleLength || 28;
  const ovulationDay    = latest ? new Date(new Date(latest.periodStart).getTime() + (cycleLength - 14) * 86400000) : null;
  const nextPeriod      = latest ? new Date(new Date(latest.periodStart).getTime() + cycleLength * 86400000) : null;

  return {
    cycles, loading, error,
    saveCycle, deleteCycle, fetchCycles,
    latest, cycleLength, ovulationDay, nextPeriod,
  };
}