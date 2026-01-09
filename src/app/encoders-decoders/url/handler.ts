//- src/app/encoders-decoders/url/handler.ts

import { useState } from "react"

export const useUrlStore = () => {
  const [conversionValue, setConversionValue] = useState<string>("encode")
  const [inputText, setInputText] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [resultCopied, setResultCopied] = useState<boolean>(false)

  const handleDropdownConversionChange = (value: string) => {
    setConversionValue(value)
    setInputText("")
    setResult("")
  }

  const handleInputTextChange = (value: string) => {
    if (conversionValue === "encode") {
      const encryptValue = encodeURIComponent(value)
      setInputText(value)
      setResult(encryptValue)
    } else {
      const decryptValue = decodeURIComponent(value)
      setInputText(value)
      setResult(decryptValue)
    }
  }

  return {
    conversionValue,
    inputText,
    result,
    resultCopied,
    setConversionValue,
    setInputText,
    setResult,
    setResultCopied,
    handleDropdownConversionChange,
    handleInputTextChange,
  }
}
