//- src/app/generators/hash/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import * as crypto from "crypto"
import { Form2Column, FormArea, FormDropdown, FormInputTextResult, FormSwitch } from "@/components/page/form"
import { X } from "lucide-react"

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "Hash",
  },
]

interface hashDataProps {
  algorithm: string,
  data: string,
  uppercase: boolean,
  outputType: crypto.BinaryToTextEncoding,
}
const hashData = ({ algorithm, data, uppercase, outputType }: hashDataProps) => {
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

const GeneratorHashPage = () => {
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

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <FormArea>
          <Form2Column>
            <FormSwitch
              id="uppercase"
              label="Uppercase"
              checked={isUppercase}
              onCheckedChange={handleUppercaseChange}
            />

            <FormDropdown
              id="output-type"
              label="Output Type"
              options={[
                { value: "hex", label: "Hex" },
                { value: "base64", label: "Base64" },
              ]}
              value={outputType}
              defaultValue="hex"
              onValueChange={handleOutputTypeChange}
            />
          </Form2Column>

          <div className="bg-background w-full">
            <InputGroup>
              <InputGroupInput
                id="input-text"
                placeholder="Type here..."
                value={inputText}
                onChange={(e) => handleInputTextChange(e.target.value)}
                className="text-muted-foreground"
              />
              <InputGroupAddon align="block-start">
                <Label htmlFor="input-text" className="text-foreground">
                  Input Text
                </Label>
                <InputGroupButton
                  variant="ghost"
                  aria-label="Help"
                  className="ml-auto rounded-full"
                  size="icon-xs"
                  onClick={handleClear}
                >
                  {inputText.length > 0 && (
                    <X />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Separator className="my-1" />

          <Form2Column>
            <FormInputTextResult
              id="result-md5"
              label="MD5"
              value={resultMd5}
              readonly={true}
              iconCopied={true}
              isCopied={isCopiedMd5}
              setIsCopied={setIsCopiedMd5}
            />

            <FormInputTextResult
              id="result-md6"
              label="MD6"
              value={resultMd6}
              readonly={true}
              iconCopied={true}
              isCopied={isCopiedMd6}
              setIsCopied={setIsCopiedMd6}
            />

            <FormInputTextResult
              id="result-sha1"
              label="SHA-1"
              value={resultSha1}
              readonly={true}
              iconCopied={true}
              isCopied={isCopiedSha1}
              setIsCopied={setIsCopiedSha1}
            />

            <FormInputTextResult
              id="result-sha256"
              label="SHA-256"
              value={resultSha256}
              readonly={true}
              iconCopied={true}
              isCopied={isCopiedSha256}
              setIsCopied={setIsCopiedSha256}
            />
          </Form2Column>

          <FormInputTextResult
            id="result-sha512"
            label="SHA-512"
            value={resultSha512}
            readonly={true}
            iconCopied={true}
            isCopied={isCopiedSha512}
            setIsCopied={setIsCopiedSha512}
          />
        </FormArea>
      </AppMain >
    </>
  )
}

export default GeneratorHashPage
