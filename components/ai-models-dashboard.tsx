"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import AIModelsTable from "@/components/ai-models-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users2, BarChart3, PieChart, Table2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelCharts } from "@/components/model-charts"
import { useAIModels } from "@/hooks/use-ai-models"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function AIModelsDashboard() {
  const { data: models, isLoading, isError } = useAIModels()

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container py-6">
        <div className="text-center text-red-500">Error loading data.</div>
      </div>
    )
  }

  const filteredModels = models || []
  const creators = Array.from(new Set(filteredModels.map((model) => model.creator))).sort()

  // Calculate statistics
  const stats = {
    total: filteredModels.length,
    openSource: filteredModels.filter((m) => m.license === "Open").length,
    proprietary: filteredModels.filter((m) => m.license === "Proprietary").length,
    providers: new Set(filteredModels.map((m) => m.creator)).size,
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Explore and compare AI language models across different providers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">Open Source Models</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openSource}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proprietary Models</CardTitle>
            <Table2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.proprietary}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.providers}</div>
          </CardContent>
        </Card>
      </div>

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
              <AIModelsTable />
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

