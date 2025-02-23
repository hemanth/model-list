"use client"

import dynamic from "next/dynamic"

// Dynamically import the dashboard with no SSR
const AIModelsDashboard = dynamic(() => import("@/components/ai-models-dashboard"), { ssr: false })

export default function Page() {
  return <AIModelsDashboard />
}

