import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatContextWindow(contextWindow: string): string {
  return contextWindow.toLowerCase()
}

export function getContextWindowValue(contextWindow: string): number {
  const value = Number.parseInt(contextWindow.replace(/[km]/g, ""))
  if (contextWindow.includes("m")) return value * 1000 // Convert millions to thousands
  return value
}

// New function to format context window values for display
export function formatContextWindowForDisplay(value: number): string {
  if (value >= 1000) {
    return `${value / 1000}m`
  }
  return `${value}k`
}

