//- src/app/encoders-decoders/url/handler.ts

import { useState } from "react"

export const useUrlStore = () => {
  const [conversionVal, setConversionVal] = useState<string>("encode")
  const [inputVal, setInputVal] = useState<string>("")
  const [outputVal, setOutputVal] = useState<string>("")
  const [outputCopied, setOutputCopied] = useState<boolean>(false)

  const handleDropdownConversionChange = (
    conversion: string,
    input: string,
    output: string,
  ) => {
    setConversionVal(conversion)
    handleInputChange(output, conversion)
  }

  const handleInputChange = (
    input: string,
    conversion: string,
  ) => {
    if (conversion === "encode") {
      const encryptVal = encodeURIComponent(input)
      setInputVal(input)
      setOutputVal(encryptVal)
    } else {
      const decryptVal = decodeURIComponent(input)
      setInputVal(input)
      setOutputVal(decryptVal)
    }
  }

  return {
    conversionVal,
    inputVal,
    outputVal,
    outputCopied,
    setConversionVal,
    setInputVal,
    setOutputVal,
    setOutputCopied,
    handleDropdownConversionChange,
    handleInputChange,
  }
}
