"use client";

import { useState, useCallback } from "react";

export function useMoodLog() {
  const [logs, setLogs] = useState([
    { id:"1", date:"Today", mood:3, energy:7, pain:2, note:"Feeling light and calm." },
    { id:"2", date:"Yesterday", mood:2, energy:5, pain:4, note:"Lower back ache." },
    { id:"3", date:"2 days ago", mood:1, energy:3, pain:7, note:"Heavy cramps. Stayed home." },
  ]);

  const addLog = useCallback((entry) => {
    setLogs(prev => [{ id: Date.now().toString(), date: "Today", ...entry }, ...prev]);
  }, []);

  return { logs, addLog };
}
