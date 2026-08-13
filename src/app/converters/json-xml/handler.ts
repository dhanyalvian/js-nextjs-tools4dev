//- src/app/converters/json-xml/handler.ts

import { useState } from "react"

type Indentation = "2" | "4"

const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

const jsonToXml = (
  obj: unknown,
  indent: number,
  currentIndent: number,
): string => {
  const pad = " ".repeat(currentIndent)
  const childPad = " ".repeat(currentIndent + indent)

  if (obj === null || obj === undefined) {
    return ""
  }

  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
    return escapeXml(String(obj))
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return ""
    return obj.map(item => {
      const value = jsonToXml(item, indent, currentIndent + indent)
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        return `${childPad}<item>\n${value}\n${childPad}</item>`
      }
      return `${childPad}<item>${value}</item>`
    }).join("\n")
  }

  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>)
    if (entries.length === 0) return ""
    return entries.map(([key, value]) => {
      const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_")
      if (typeof value === "object" && value !== null) {
        const childValue = jsonToXml(value, indent, currentIndent + indent)
        if (Array.isArray(value)) {
          return `${pad}<${safeKey}>\n${childValue}\n${pad}</${safeKey}>`
        }
        return `${pad}<${safeKey}>\n${childValue}\n${pad}</${safeKey}>`
      }
      const escapedValue = escapeXml(String(value))
      return `${pad}<${safeKey}>${escapedValue}</${safeKey}>`
    }).join("\n")
  }

  return ""
}

const convertJsonToXml = (
  input: string,
  indentation: Indentation,
): string => {
  if (!input.trim()) return ""
  const parsed = JSON.parse(input)
  const indent = Number(indentation)
  const xmlBody = jsonToXml(parsed, indent, indent)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${xmlBody}\n</root>`
}

export const useJsonToXmlStore = () => {
  const [indentation, setIndentation] = useState<Indentation>("2")
  const [inputVal, setInputVal] = useState<string>("")
  const [outputVal, setOutputVal] = useState<string>("")
  const [outputCopied, setOutputCopied] = useState<boolean>(false)

  const handleInputChange = (
    input: string,
    ind: Indentation,
  ) => {
    setInputVal(input)
    try {
      setOutputVal(convertJsonToXml(input, ind))
    } catch {
      setOutputVal("")
    }
  }

  const handleIndentationChange = (value: string) => {
    const ind = value as Indentation
    setIndentation(ind)
    handleInputChange(inputVal, ind)
  }

  return {
    indentation,
    inputVal,
    outputVal,
    outputCopied,
    setOutputCopied,
    handleInputChange,
    handleIndentationChange,
  }
}