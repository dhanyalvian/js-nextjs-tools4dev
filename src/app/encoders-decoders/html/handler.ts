//- src/app/encoders-decoders/html/handler.ts

import { useState } from "react"
import { encode, decode } from "html-entities"

export const useHtmlStore = () => {
  const [conversionValue, setConversionValue] = useState<string>("encode")
  const [inputVal, setInputVal] = useState<string>("")
  const [outputVal, setOutputVal] = useState<string>("")
  const [outputCopied, setOutputCopied] = useState<boolean>(false)

  const handleDropdownConversionChange = (
    value: string,
    input: string,
    output: string,
  ) => {
    setConversionValue(value)
    setInputVal(output)
    setOutputVal(input)
  }

  const handleInputChange = (value: string) => {
    if (conversionValue === "encode") {
      const encryptValue = encode(value)
      setInputVal(value)
      setOutputVal(encryptValue)
    } else {
      const decryptValue = decode(value)
      setInputVal(value)
      setOutputVal(decryptValue)
    }
  }

  return {
    conversionValue,
    inputVal,
    outputVal,
    outputCopied,
    setConversionValue,
    setInputVal,
    setOutputVal,
    setOutputCopied,
    handleDropdownConversionChange,
    handleInputChange,
  }
}
