"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatContextWindow } from "@/lib/utils"
import type { Model } from "@/types"

interface ModelTableProps {
  models: Model[]
}

export function ModelTable({ models }: ModelTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Model Name</TableHead>
          <TableHead className="w-[25%]">Creator</TableHead>
          <TableHead className="w-[15%]">Context Window</TableHead>
          <TableHead className="w-[20%]">License</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{model.name}</TableCell>
            <TableCell>{model.creator}</TableCell>
            <TableCell>{formatContextWindow(model.contextWindow)}</TableCell>
            <TableCell>
              <Badge variant={model.license === "Open" ? "secondary" : "default"}>{model.license}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

