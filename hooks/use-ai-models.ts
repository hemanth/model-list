"use client"

import { useState, useEffect } from "react"
import aiModelsData from "@/data/ai-models.json"
import type { Model } from "@/types"

export const useAIModels = () => {
  const [data, setData] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    try {
      setData(aiModelsData.models)
      setIsError(false)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, isError }
}

