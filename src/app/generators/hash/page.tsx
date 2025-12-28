//- src/app/generators/hash/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ClipboardPaste, Copy, Check } from "lucide-react"
import { useState } from "react"
import * as crypto from "crypto"
import { Switch } from "@/components/ui/switch"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { CopyToClipboard } from "@/hooks/use-copy"

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "Hash",
  },
]

interface hashResult {
  "md5": string,
  "sha1": string,
  "sha256": string,
  "sha512": string,
}

interface copyResult {
  "md5": boolean,
  "sha1": boolean,
  "sha256": boolean,
  "sha512": boolean,
}

const hashTypes: {
  key: keyof hashResult,
  title: string,
  value: string
}[] = [
    {
      "key": "md5",
      "title": "MD5",
      "value": "edc70457d9ddad2ba2ad578b66af0912"
    },
    {
      "key": "sha1",
      "title": "SHA-1",
      "value": "a6722b902d1ba545a510cad153fd2fc3e7c1e2ac"
    },
    {
      "key": "sha256",
      "title": "SHA-256",
      "value": "41aa42765f552f704c7d64f8b73278474b5c6bf895a15e69ceedf7b0e49541ea"
    },
    {
      "key": "sha512",
      "title": "SHA-512",
      "value": "65fe99cd80f3ff9c8d28a2fb41827c3471e95138c563402aaa01942cea172da70284b382fd0039433c8c2490c8cb9173071e5d34e870d6c61cb8b7e6b38b5cb5"
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

  let result = crypto.createHash(algorithm)
    .update(data)
    .digest(outputType); // 'hex', 'base64', or 'latin1' encoding for output

  if (uppercase) {
    result = result.toUpperCase()
  }

  return result
}

const GeneratorHashPage = () => {
  const [result, setResult] = useState<hashResult>({
    "md5": "",
    "sha1": "",
    "sha256": "",
    "sha512": "",
  })
  const [isUppercase, setIsUppercase] = useState<boolean>(false)
  const [outputType, setOutputType] = useState<crypto.BinaryToTextEncoding>("hex")
  const [inputText, setInputText] = useState<string>("")
  const [isCopied, setIsCopied] = useState<copyResult>({
    "md5": false,
    "sha1": false,
    "sha256": false,
    "sha512": false,
  })

  const handleInputTextChange = (
    value: string,
    explicitOutputType?: crypto.BinaryToTextEncoding,
    explicitUppercase?: boolean,
  ) => {
    const currentOutputType = explicitOutputType ?? outputType
    const currentUppercase = explicitUppercase ?? isUppercase

    setInputText(value)
    setResult({
      "md5": hashData({ algorithm: "md5", data: value, uppercase: currentUppercase, outputType: currentOutputType }),
      "sha1": hashData({ algorithm: "sha1", data: value, uppercase: currentUppercase, outputType: currentOutputType }),
      "sha256": hashData({ algorithm: "sha256", data: value, uppercase: currentUppercase, outputType: currentOutputType }),
      "sha512": hashData({ algorithm: "sha512", data: value, uppercase: currentUppercase, outputType: currentOutputType }),
    })
  }

  const handleOutputTypeChange = (
    value: crypto.BinaryToTextEncoding,
    inputText: string,
  ) => {
    setOutputType(value)
    handleInputTextChange(inputText, value)
  }

  const handleUppercaseChange = (value: boolean, inputText: string) => {
    setIsUppercase(value)
    handleInputTextChange(inputText, undefined, value)
  }

  const handleCopyToClipboard = (key: keyof copyResult, value: string) => {
    CopyToClipboard(value)
    setIsCopied({
      ...isCopied,
      [key]: true,
    })
    setTimeout(() => {
      setIsCopied({
        ...isCopied,
        [key]: false,
      })
    }, 2000)
  }

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <div className="bg-background">
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton
                      variant="ghost"
                      aria-label="Help"
                      className="ml-auto rounded-full"
                      size="icon-xs"
                    >
                      <ClipboardPaste />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Paste here</p>
                  </TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="bg-background">
            <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
              <Label htmlFor="uppercase" className="text-foreground">
                Output Type
              </Label>
              <NativeSelect size="sm" onChange={(e) => handleOutputTypeChange(
                e.target.value as crypto.BinaryToTextEncoding,
                inputText,
              )}>
                <NativeSelectOption value="hex">Hex</NativeSelectOption>
                <NativeSelectOption value="base64">Base64</NativeSelectOption>
              </NativeSelect>
            </InputGroup>
          </div>

          <div className="bg-background">
            <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
              <Label htmlFor="uppercase" className="text-foreground">
                Uppercase
              </Label>
              <div className="flex items-center gap-2">
                <span className="font-normal text-sm">
                  {isUppercase ? "On" : "Off"}
                </span>
                <Switch
                  id="uppercase"
                  checked={isUppercase}
                  onCheckedChange={(checked) => handleUppercaseChange(checked, inputText)}
                />
              </div>
            </InputGroup>
          </div>

          <Separator className="my-1" />

          {hashTypes.map((row) => (
            <div key={row.title} className="grid w-full gap-4 bg-background">
              <InputGroup>
                <InputGroupInput
                  id={row.title}
                  placeholder="..."
                  readOnly
                  value={result[row.key]}
                  className="text-muted-foreground"
                />
                <InputGroupAddon align="block-start">
                  <Label htmlFor={row.title} className="text-foreground">
                    {row.title}
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Help"
                        className="ml-auto rounded-full"
                        size="icon-xs"
                        onClick={() => handleCopyToClipboard(row.key, result[row.key])}
                      >
                        {isCopied[row.key]
                          ? <Check className="transition-all" />
                          : <Copy className="transition-all" />
                        }
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      <p>{isCopied[row.key] ? "Copied" : "Copy to clipboard"}</p>
                    </TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </div>
          ))}
        </div>
      </AppMain>
    </>
  )
}

export default GeneratorHashPage
