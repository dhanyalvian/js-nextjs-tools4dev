//- src/app/encoders-decoders/base64/state.ts

import { Base64Decode, Base64Encode } from "@/lib/base64"
import { useState } from "react"

export const useBase64Store = () => {
  const [conversionValue, setConversionValue] = useState<string>("encode")
  const [encodingValue, setEncodingValue] = useState<BufferEncoding>("utf-8")
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
      const encryptValue = Base64Encode(value, encodingValue)
      setInputText(value)
      setResult(encryptValue)
    } else {
      const decryptValue = Base64Decode(value, encodingValue)
      setInputText(value)
      setResult(decryptValue)
    }
  }

  return {
    conversionValue,
    encodingValue,
    inputText,
    result,
    resultCopied,
    setConversionValue,
    setEncodingValue,
    setInputText,
    setResult,
    setResultCopied,
    handleDropdownConversionChange,
    handleInputTextChange,
  }
}
