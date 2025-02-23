"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Pie, Line } from "react-chartjs-2"
import { getContextWindowValue, formatContextWindowForDisplay } from "@/lib/utils"
import type { Model } from "@/types"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement)

interface ModelChartsProps {
  filteredModels: Model[]
  creators: string[]
  stats: {
    openSource: number
    proprietary: number
  }
}

export function ModelCharts({ filteredModels, creators, stats }: ModelChartsProps) {
  // Prepare chart data for creators
  const creatorStats = creators
    .map((creator) => ({
      creator,
      count: filteredModels.filter((m) => m.creator === creator).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Show top 10 providers

  // Prepare context window distribution data
  const contextWindows = [
    { range: "0-8k", count: 0, maxValue: 8 },
    { range: "9k-32k", count: 0, maxValue: 32 },
    { range: "33k-128k", count: 0, maxValue: 128 },
    { range: "129k-256k", count: 0, maxValue: 256 },
    { range: "257k-1m", count: 0, maxValue: 1000 },
    { range: "1m+", count: 0, maxValue: Number.POSITIVE_INFINITY },
  ]

  filteredModels.forEach((model) => {
    const value = getContextWindowValue(model.contextWindow)
    const bracket = contextWindows.find((cw) => value <= cw.maxValue)
    if (bracket) {
      bracket.count++
    }
  })

  // Prepare data for largest context windows
  const largestContextWindows = [...filteredModels]
    .sort((a, b) => getContextWindowValue(b.contextWindow) - getContextWindowValue(a.contextWindow))
    .slice(0, 10)

  // Prepare data for context window trend
  const creatorAverages = creators
    .map((creator) => {
      const creatorModels = filteredModels.filter((m) => m.creator === creator)
      const avgContextWindow =
        creatorModels.reduce((acc, model) => acc + getContextWindowValue(model.contextWindow), 0) / creatorModels.length
      return {
        creator,
        average: Math.round(avgContextWindow),
      }
    })
    .sort((a, b) => b.average - a.average)

  const chartData = {
    creators: {
      labels: creatorStats.map((s) => s.creator),
      datasets: [
        {
          label: "Number of Models",
          data: creatorStats.map((s) => s.count),
          backgroundColor: "rgba(53, 162, 235, 0.8)",
        },
      ],
    },
    contextWindows: {
      labels: contextWindows.map((cw) => cw.range),
      datasets: [
        {
          label: "Number of Models",
          data: contextWindows.map((cw) => cw.count),
          backgroundColor: "rgba(75, 192, 192, 0.8)",
        },
      ],
    },
    license: {
      labels: ["Open Source", "Proprietary"],
      datasets: [
        {
          data: [stats.openSource, stats.proprietary],
          backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(255, 99, 132, 0.8)"],
        },
      ],
    },
    largestContextWindows: {
      labels: largestContextWindows.map((m) => m.name),
      datasets: [
        {
          label: "Context Window Size",
          data: largestContextWindows.map((m) => getContextWindowValue(m.contextWindow)),
          backgroundColor: "rgba(153, 102, 255, 0.8)",
        },
      ],
    },
    contextWindowTrend: {
      labels: creatorAverages.map((ca) => ca.creator),
      datasets: [
        {
          label: "Average Context Window Size",
          data: creatorAverages.map((ca) => ca.average),
          borderColor: "rgba(255, 99, 132, 0.8)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    },
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3]">
              <Bar
                data={chartData.creators}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>License Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3]">
              <Pie
                data={chartData.license}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Context Window Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3]">
              <Bar
                data={chartData.contextWindows}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Number of Models",
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Context Window Size",
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Models by Context Window</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3]">
              <Bar
                data={chartData.largestContextWindows}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw as number
                          return `Context Window: ${formatContextWindowForDisplay(value)}`
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Context Window Size (k tokens)",
                      },
                      ticks: {
                        callback: (value) => formatContextWindowForDisplay(value as number),
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Context Window by Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <Line
              data={chartData.contextWindowTrend}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.raw as number
                        return `Average: ${formatContextWindowForDisplay(value)}`
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Context Window Size (k tokens)",
                    },
                    ticks: {
                      callback: (value) => formatContextWindowForDisplay(value as number),
                    },
                  },
                  x: {
                    ticks: {
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

