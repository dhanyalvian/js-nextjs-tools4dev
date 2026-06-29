//- src/app/formatters/json/handler.ts

import { useState } from "react"

type Indentation = "2" | "4" | "tab" | "minified"

const sortObject = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    return obj.map(sortObject)
  }
  if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    const sorted: Record<string, unknown> = {}
    for (const key of Object.keys(obj).sort()) {
      sorted[key] = sortObject((obj as Record<string, unknown>)[key])
    }
    return sorted
  }
  return obj
}

const formatJson = (
  input: string,
  indentation: Indentation,
  sortKeys: boolean,
): string => {
  if (!input.trim()) return ""
  const parsed = JSON.parse(input)
  const data = sortKeys ? sortObject(parsed) : parsed
  if (indentation === "minified") {
    return JSON.stringify(data)
  }
  const spaces = indentation === "tab" ? "\t" : Number(indentation)
  return JSON.stringify(data, null, spaces)
}

export const useJsonFormatterStore = () => {
  const [indentation, setIndentation] = useState<Indentation>("2")
  const [sortKeys, setSortKeys] = useState<boolean>(false)
  const [inputVal, setInputVal] = useState<string>("")
  const [outputVal, setOutputVal] = useState<string>("")
  const [outputCopied, setOutputCopied] = useState<boolean>(false)

  const handleInputChange = (
    input: string,
    ind: Indentation,
    sort: boolean,
  ) => {
    setInputVal(input)
    try {
      setOutputVal(formatJson(input, ind, sort))
    } catch {
      setOutputVal("")
    }
  }

  const handleIndentationChange = (value: string) => {
    const ind = value as Indentation
    setIndentation(ind)
    handleInputChange(inputVal, ind, sortKeys)
  }

  const handleSortKeysChange = (checked: boolean) => {
    setSortKeys(checked)
    handleInputChange(inputVal, indentation, checked)
  }

  return {
    indentation,
    sortKeys,
    inputVal,
    outputVal,
    outputCopied,
    setOutputVal,
    setOutputCopied,
    handleInputChange,
    handleIndentationChange,
    handleSortKeysChange,
  }
}
