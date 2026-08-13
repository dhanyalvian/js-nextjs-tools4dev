//- src/app/converters/json-yaml/handler.ts

import { useState } from "react"
import { stringify } from "yaml"

type Indentation = "2" | "4"

const convertJsonToYaml = (
  input: string,
  indentation: Indentation,
): string => {
  if (!input.trim()) return ""
  const parsed = JSON.parse(input)
  const indent = Number(indentation)
  return stringify(parsed, { indent, lineWidth: 0 })
}

export const useJsonToYamlStore = () => {
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
      setOutputVal(convertJsonToYaml(input, ind))
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