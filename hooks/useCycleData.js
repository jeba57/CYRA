"use client";

import { useState } from "react";
import { getCyclePhase } from "@/lib/utils";

export function useCycleData() {
  const [lastPeriodStart] = useState(new Date("2025-05-01"));
  const [cycleLength]     = useState(28);
  const [periodLength]    = useState(5);

  const dayOfCycle = Math.floor((Date.now() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const currentPhase = getCyclePhase(dayOfCycle, cycleLength);

  const nextPeriod = new Date(lastPeriodStart);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  const ovulationDay = new Date(lastPeriodStart);
  ovulationDay.setDate(ovulationDay.getDate() + 14);

  return {
    lastPeriodStart,
    cycleLength,
    periodLength,
    dayOfCycle,
    currentPhase,
    nextPeriod,
    ovulationDay,
  };
}
