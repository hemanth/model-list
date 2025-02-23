"use client"

import { useState } from "react"
import { BarChart3, PieChart, Table2 } from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelTable } from "@/components/model-table"
import { ModelCharts } from "@/components/model-charts"
import modelsData from "@/data/ai-models.json"
import { getContextWindowValue } from "@/lib/utils"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function AIModelsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [creatorFilter, setCreatorFilter] = useState<string>("all")
  const [licenseFilter, setLicenseFilter] = useState<string>("all")
  const [contextWindowSort, setContextWindowSort] = useState<"asc" | "desc" | null>(null)

  const creators = Array.from(new Set(modelsData.models.map((model) => model.creator))).sort()

  const filteredModels = modelsData.models
    .filter((model) => {
      const creatorMatch = creatorFilter === "all" || model.creator === creatorFilter
      const licenseMatch = licenseFilter === "all" || model.license === licenseFilter
      const searchMatch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.creator.toLowerCase().includes(searchTerm.toLowerCase())
      return creatorMatch && licenseMatch && searchMatch
    })
    .sort((a, b) => {
      if (contextWindowSort === null) return 0
      const aValue = getContextWindowValue(a.contextWindow)
      const bValue = getContextWindowValue(b.contextWindow)
      return contextWindowSort === "asc" ? aValue - bValue : bValue - aValue
    })

  // Calculate statistics
  const stats = {
    total: filteredModels.length,
    openSource: filteredModels.filter((m) => m.license === "Open").length,
    proprietary: filteredModels.filter((m) => m.license === "Proprietary").length,
    creators: new Set(filteredModels.map((m) => m.creator)).size,
    averageContext: Math.round(
      filteredModels.reduce((acc, model) => acc + getContextWindowValue(model.contextWindow), 0) /
        filteredModels.length,
    ),
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Explore and compare AI language models across different providers.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Source</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openSource}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proprietary</CardTitle>
            <Table2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.proprietary}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Context</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageContext}k</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:max-w-[200px]"
          />
          <Select value={creatorFilter} onValueChange={setCreatorFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by Creator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Creators</SelectItem>
              {creators.map((creator) => (
                <SelectItem key={creator} value={creator}>
                  {creator}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={contextWindowSort || "none"}
            onValueChange={(value) => setContextWindowSort(value as "asc" | "desc" | null)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by Context Window" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Sort</SelectItem>
              <SelectItem value="asc">Smallest to Largest</SelectItem>
              <SelectItem value="desc">Largest to Smallest</SelectItem>
            </SelectContent>
          </Select>
          <Select value={licenseFilter} onValueChange={setLicenseFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by License" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Licenses</SelectItem>
              <SelectItem value="Open">Open Source</SelectItem>
              <SelectItem value="Proprietary">Proprietary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* View Selector */}
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="table" className="flex-1 sm:flex-none">
            Table View
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex-1 sm:flex-none">
            Charts View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <ModelTable models={filteredModels} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <div className="space-y-6">
            <ModelCharts
              filteredModels={filteredModels}
              creators={creators}
              stats={{ openSource: stats.openSource, proprietary: stats.proprietary }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

