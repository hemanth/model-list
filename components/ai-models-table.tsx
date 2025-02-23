"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { getContextWindowValue } from "@/lib/utils"

type Model = {
  name: string
  creator: string
  license: "Open" | "Proprietary"
  contextWindow: string
}

// Full dataset of all models
const models: Model[] = [
  // OpenAI Models
  { name: "o1", creator: "OpenAI", license: "Proprietary", contextWindow: "200k" },
  { name: "o3-mini", creator: "OpenAI", license: "Proprietary", contextWindow: "200k" },
  { name: "o1-preview", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "o1-mini", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "GPT-4o (Aug '24)", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "GPT-4o (May '24)", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "GPT-4o (Nov '24)", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "GPT-4o mini", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "GPT-4o (ChatGPT)", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "o3", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "GPT-4 Turbo", creator: "OpenAI", license: "Proprietary", contextWindow: "128k" },
  { name: "GPT-4", creator: "OpenAI", license: "Proprietary", contextWindow: "8k" },

  // Meta Models
  { name: "Llama 3.3 Instruct 70B", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3.1 Instruct 405B", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3.2 Instruct 90B (Vision)", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3.1 Instruct 70B", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3.2 Instruct 11B (Vision)", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3.1 Instruct 8B", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3.2 Instruct 3B", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3.2 Instruct 1B", creator: "Meta", license: "Open", contextWindow: "128k" },
  { name: "Llama 3 Instruct 70B", creator: "Meta", license: "Open", contextWindow: "8k" },
  { name: "Llama 3 Instruct 8B", creator: "Meta", license: "Open", contextWindow: "8k" },
  { name: "Llama 2 Chat 7B", creator: "Meta", license: "Open", contextWindow: "4k" },

  // xAI Models
  { name: "Grok 3", creator: "xAI", license: "Proprietary", contextWindow: "128k" },
  { name: "Grok 3 mini", creator: "xAI", license: "Proprietary", contextWindow: "128k" },
  { name: "Grok 3 Reasoning Beta", creator: "xAI", license: "Proprietary", contextWindow: "128k" },
  { name: "Grok 3 mini Reasoning", creator: "xAI", license: "Proprietary", contextWindow: "128k" },
  { name: "Grok Beta", creator: "xAI", license: "Proprietary", contextWindow: "128k" },

  // Google Models
  { name: "Gemini 2.0 Pro Experimental (Feb '25)", creator: "Google", license: "Proprietary", contextWindow: "2m" },
  { name: "Gemini 2.0 Flash (Feb '25)", creator: "Google", license: "Proprietary", contextWindow: "1m" },
  { name: "Gemini 2.0 Flash (experimental)", creator: "Google", license: "Proprietary", contextWindow: "1m" },
  { name: "Gemini 1.5 Pro (Sep '24)", creator: "Google", license: "Proprietary", contextWindow: "2m" },
  { name: "Gemini 2.0 Flash-Lite (Preview)", creator: "Google", license: "Proprietary", contextWindow: "1m" },
  { name: "Gemini 1.5 Flash (Sep '24)", creator: "Google", license: "Proprietary", contextWindow: "1m" },
  { name: "Gemini 1.5 Pro (May '24)", creator: "Google", license: "Proprietary", contextWindow: "2m" },
  { name: "Gemma 2 27B", creator: "Google", license: "Open", contextWindow: "8k" },
  { name: "Gemma 2 9B", creator: "Google", license: "Open", contextWindow: "8k" },
  { name: "Gemini 1.5 Flash-8B", creator: "Google", license: "Proprietary", contextWindow: "1m" },
  { name: "Gemini 1.5 Flash (May '24)", creator: "Google", license: "Proprietary", contextWindow: "1m" },
  { name: "Gemini Experimental (Dec '24)", creator: "Google", license: "Proprietary", contextWindow: "2m" },
  { name: "Gemini 1.0 Pro", creator: "Google", license: "Proprietary", contextWindow: "33k" },

  // Anthropic Models
  { name: "Claude 3.5 Sonnet (Oct '24)", creator: "Anthropic", license: "Proprietary", contextWindow: "200k" },
  { name: "Claude 3.5 Sonnet (June '24)", creator: "Anthropic", license: "Proprietary", contextWindow: "200k" },
  { name: "Claude 3 Opus", creator: "Anthropic", license: "Proprietary", contextWindow: "200k" },
  { name: "Claude 3.5 Haiku", creator: "Anthropic", license: "Proprietary", contextWindow: "200k" },
  { name: "Claude 3 Haiku", creator: "Anthropic", license: "Proprietary", contextWindow: "200k" },
  { name: "Claude 3 Sonnet", creator: "Anthropic", license: "Proprietary", contextWindow: "200k" },
  { name: "Claude 2.1", creator: "Anthropic", license: "Proprietary", contextWindow: "200k" },
  { name: "Claude 2.0", creator: "Anthropic", license: "Proprietary", contextWindow: "100k" },

  // Mistral Models
  { name: "Pixtral Large", creator: "Mistral", license: "Open", contextWindow: "128k" },
  { name: "Mistral Large 2 (Nov '24)", creator: "Mistral", license: "Open", contextWindow: "128k" },
  { name: "Mistral Large 2 (Jul '24)", creator: "Mistral", license: "Open", contextWindow: "128k" },
  { name: "Mistral Small 3", creator: "Mistral", license: "Open", contextWindow: "32k" },
  { name: "Mistral Small (Sep '24)", creator: "Mistral", license: "Open", contextWindow: "33k" },
  { name: "Mixtral 8x22B Instruct", creator: "Mistral", license: "Open", contextWindow: "65k" },
  { name: "Pixtral 12B (2409)", creator: "Mistral", license: "Open", contextWindow: "128k" },
  { name: "Ministral 8B", creator: "Mistral", license: "Open", contextWindow: "128k" },
  { name: "Mistral NeMo", creator: "Mistral", license: "Open", contextWindow: "128k" },
  { name: "Ministral 3B", creator: "Mistral", license: "Proprietary", contextWindow: "128k" },
  { name: "Mixtral 8x7B Instruct", creator: "Mistral", license: "Open", contextWindow: "33k" },
  { name: "Codestral-Mamba", creator: "Mistral", license: "Open", contextWindow: "256k" },
  { name: "Codestral (Jan '25)", creator: "Mistral", license: "Proprietary", contextWindow: "256k" },
  { name: "Mistral Saba", creator: "Mistral", license: "Proprietary", contextWindow: "32k" },
  { name: "Mistral Small (Feb '24)", creator: "Mistral", license: "Proprietary", contextWindow: "33k" },
  { name: "Mistral Large (Feb '24)", creator: "Mistral", license: "Proprietary", contextWindow: "33k" },
  { name: "Mistral 7B Instruct", creator: "Mistral", license: "Open", contextWindow: "8k" },
  { name: "Mistral Medium", creator: "Mistral", license: "Proprietary", contextWindow: "33k" },
  { name: "Codestral (May '24)", creator: "Mistral", license: "Open", contextWindow: "33k" },

  // DeepSeek Models
  { name: "DeepSeek R1", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek R1 Distill Llama 70B", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek V3", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek-V2.5 (Dec '24)", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek-Coder-V2", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek LLM 67B Chat (V1)", creator: "DeepSeek", license: "Open", contextWindow: "4k" },
  { name: "DeepSeek R1 Distill Llama 8B", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek R1 Distill Qwen 32B", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek-V2.5", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek R1 Distill Qwen 14B", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek R1 Distill Qwen 1.5B", creator: "DeepSeek", license: "Open", contextWindow: "128k" },
  { name: "DeepSeek-V2-Chat", creator: "DeepSeek", license: "Open", contextWindow: "128k" },

  // Additional Models from other companies...
  { name: "Sonar", creator: "Perplexity", license: "Proprietary", contextWindow: "127k" },
  { name: "Sonar Pro", creator: "Perplexity", license: "Proprietary", contextWindow: "200k" },
  { name: "Nova Pro", creator: "Amazon", license: "Proprietary", contextWindow: "300k" },
  { name: "Nova Lite", creator: "Amazon", license: "Proprietary", contextWindow: "300k" },
  { name: "Nova Micro", creator: "Amazon", license: "Proprietary", contextWindow: "130k" },
  { name: "Phi-4", creator: "Microsoft Azure", license: "Open", contextWindow: "16k" },
  { name: "Solar Mini", creator: "Upstage", license: "Open", contextWindow: "4k" },
  { name: "DBRX Instruct", creator: "Databricks", license: "Open", contextWindow: "33k" },
  { name: "MiniMax-Text-01", creator: "MiniMax", license: "Open", contextWindow: "4m" },
]

type SortConfig = {
  key: keyof Model
  direction: "asc" | "desc" | null
}

export default function AIModelsTable() {
  const [creatorFilter, setCreatorFilter] = useState<string>("all")
  const [licenseFilter, setLicenseFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: null })

  const creators = Array.from(new Set(models.map((model) => model.creator))).sort()

  const handleSort = (key: keyof Model) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const getSortIcon = (key: keyof Model) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 ml-1" />
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    )
  }

  const filteredAndSortedModels = models
    .filter((model) => {
      const creatorMatch = creatorFilter === "all" || model.creator === creatorFilter
      const licenseMatch = licenseFilter === "all" || model.license === licenseFilter
      const searchMatch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.creator.toLowerCase().includes(searchTerm.toLowerCase())
      return creatorMatch && licenseMatch && searchMatch
    })
    .sort((a, b) => {
      if (sortConfig.direction === null) return 0

      // Special handling for context window sorting
      if (sortConfig.key === "contextWindow") {
        const aValue = getContextWindowValue(a.contextWindow)
        const bValue = getContextWindowValue(b.contextWindow)
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
      }

      // Default sorting for other columns
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={creatorFilter} onValueChange={setCreatorFilter}>
          <SelectTrigger className="w-[200px]">
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
        <Select value={licenseFilter} onValueChange={setLicenseFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by License" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Licenses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Proprietary">Proprietary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                <div className="flex items-center">Model Name {getSortIcon("name")}</div>
              </TableHead>
              <TableHead onClick={() => handleSort("creator")} className="cursor-pointer">
                <div className="flex items-center">Creator {getSortIcon("creator")}</div>
              </TableHead>
              <TableHead onClick={() => handleSort("contextWindow")} className="cursor-pointer">
                <div className="flex items-center">Context Window {getSortIcon("contextWindow")}</div>
              </TableHead>
              <TableHead onClick={() => handleSort("license")} className="cursor-pointer">
                <div className="flex items-center">License {getSortIcon("license")}</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedModels.map((model, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{model.name}</TableCell>
                <TableCell>{model.creator}</TableCell>
                <TableCell>{model.contextWindow}</TableCell>
                <TableCell>
                  <Badge variant={model.license === "Open" ? "secondary" : "default"}>{model.license}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedModels.length} of {models.length} models
      </div>
    </div>
  )
}

