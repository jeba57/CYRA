import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  }).format(date);
}

export function getDayOfCycle(lastPeriodStart) {
  const diff = Date.now() - new Date(lastPeriodStart).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

export function getCyclePhase(dayOfCycle, cycleLength = 28) {
  if (dayOfCycle <= 5)              return "menstruation";
  if (dayOfCycle <= 13)             return "follicular";
  if (dayOfCycle <= 16)             return "ovulation";
  if (dayOfCycle <= cycleLength)    return "luteal";
  return "menstruation";
}
