//- src/app/encoders-decoders/html/handler.ts

import { useState } from "react"
import { encode, decode } from "html-entities"

export const useHtmlStore = () => {
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
      const encryptValue = encode(value)
      setInputText(value)
      setResult(encryptValue)
    } else {
      const decryptValue = decode(value)
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
