//- src/app/encoders-decoders/base64/state.ts

import { Base64Decode, Base64Encode } from "@/lib/base64"
import { useState } from "react"

export const useBase64Store = () => {
  const [conversionVal, setConversionVal] = useState<string>("encode")
  const [encodingVal, setEncodingVal] = useState<BufferEncoding>("utf-8")
  const [inputVal, setInputVal] = useState<string>("")
  const [outputVal, setOutputVal] = useState<string>("")
  const [outputCopied, setOutputCopied] = useState<boolean>(false)

  const handleDropdownConversionChange = (
    conversion: string,
    input: string,
    output: string,
  ) => {
    setConversionVal(conversion)
    setInputVal(output)
    setOutputVal(input)
  }

  const handleDropdownEncodingChange = (
    encoding: BufferEncoding,
    conversion: string,
    input: string,
  ) => {
    setEncodingVal(encoding)
    handleInputChange(input, conversion, encoding)
  }

  const handleInputChange = (
    input: string,
    conversion: string,
    encoding: BufferEncoding,
  ) => {
    if (conversion === "encode") {
      const encryptValue = Base64Encode(input, encoding)
      setInputVal(input)
      setOutputVal(encryptValue)
    } else {
      const decryptValue = Base64Decode(input, encoding)
      setInputVal(input)
      setOutputVal(decryptValue)
    }
  }

  return {
    conversionVal,
    encodingVal,
    inputVal,
    outputVal,
    outputCopied,
    setConversionVal,
    setEncodingVal,
    setInputVal,
    setOutputVal,
    setOutputCopied,
    handleDropdownConversionChange,
    handleDropdownEncodingChange,
    handleInputChange,
  }
}
