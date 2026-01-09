//- src/app/generators/hash/state.ts

import crypto from "crypto"
import { useState } from "react"

export const useHashStore = () => {
  const [outputType, setOutputType] = useState<crypto.BinaryToTextEncoding>("hex")
  const [isUppercase, setIsUppercase] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>("")

  const [resultMd5, setResultMd5] = useState<string>("")
  const [resultMd6, setResultMd6] = useState<string>("")
  const [resultSha1, setResultSha1] = useState<string>("")
  const [resultSha256, setResultSha256] = useState<string>("")
  const [resultSha512, setResultSha512] = useState<string>("")

  const [isCopiedMd5, setIsCopiedMd5] = useState<boolean>(false)
  const [isCopiedMd6, setIsCopiedMd6] = useState<boolean>(false)
  const [isCopiedSha1, setIsCopiedSha1] = useState<boolean>(false)
  const [isCopiedSha256, setIsCopiedSha256] = useState<boolean>(false)
  const [isCopiedSha512, setIsCopiedSha512] = useState<boolean>(false)

  const handleInputTextChange = (
    value: string,
    explicitOutputType?: crypto.BinaryToTextEncoding,
    explicitUppercase?: boolean,
  ) => {
    const currentOutputType = explicitOutputType ?? outputType
    const currentUppercase = explicitUppercase ?? isUppercase

    setInputText(value)
    setResultMd5(hashData({ algorithm: "md5", data: value, uppercase: currentUppercase, outputType: currentOutputType }))
    setResultMd6(hashData({ algorithm: "md6", data: value, uppercase: currentUppercase, outputType: currentOutputType }))
    setResultSha1(hashData({ algorithm: "sha1", data: value, uppercase: currentUppercase, outputType: currentOutputType }))
    setResultSha256(hashData({ algorithm: "sha256", data: value, uppercase: currentUppercase, outputType: currentOutputType }))
    setResultSha512(hashData({ algorithm: "sha512", data: value, uppercase: currentUppercase, outputType: currentOutputType }))
  }

  const handleOutputTypeChange = (value: string) => {
    setOutputType(value as crypto.BinaryToTextEncoding)
    handleInputTextChange(inputText, value as crypto.BinaryToTextEncoding)
  }

  const handleUppercaseChange = (value: boolean) => {
    setIsUppercase(value)
    handleInputTextChange(inputText, undefined, value)
  }

  const handleClear = () => {
    setInputText("")
    setResultMd5("")
    setResultMd6("")
    setResultSha1("")
    setResultSha256("")
    setResultSha512("")
  }

  return {
    outputType,
    isUppercase,
    inputText,
    resultMd5,
    resultMd6,
    resultSha1,
    resultSha256,
    resultSha512,
    isCopiedMd5,
    isCopiedMd6,
    isCopiedSha1,
    isCopiedSha256,
    isCopiedSha512,
    setOutputType,
    setIsUppercase,
    setInputText,
    setResultMd5,
    setResultMd6,
    setResultSha1,
    setResultSha256,
    setResultSha512,
    setIsCopiedMd5,
    setIsCopiedMd6,
    setIsCopiedSha1,
    setIsCopiedSha256,
    setIsCopiedSha512,
    handleInputTextChange,
    handleOutputTypeChange,
    handleUppercaseChange,
    handleClear,
  }
}

interface hashDataProps {
  algorithm: string,
  data: string,
  uppercase: boolean,
  outputType: crypto.BinaryToTextEncoding,
}
export const hashData = ({ algorithm, data, uppercase, outputType }: hashDataProps) => {
  if (!data) return ""

  let result = ""

  if (algorithm === "md6") {
    result = "coming soon"
  } else {
    result = crypto.createHash(algorithm)
      .update(data)
      .digest(outputType); // 'hex', 'base64', or 'latin1' encoding for output
  }

  if (uppercase) {
    result = result.toUpperCase()
  }

  return result
}
