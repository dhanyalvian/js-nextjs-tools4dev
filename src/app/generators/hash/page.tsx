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
import {
  Form2Column,
  FormArea,
  FormDropdown,
  FormInputTextResult,
  FormSwitch,
} from "@/components/page/form"
import { X } from "lucide-react"
import { useHashStore } from "./handler"

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "Hash",
  },
]

const GeneratorHashPage = () => {
  const {
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
    setIsCopiedMd5,
    setIsCopiedMd6,
    setIsCopiedSha1,
    setIsCopiedSha256,
    setIsCopiedSha512,
    handleInputTextChange,
    handleOutputTypeChange,
    handleUppercaseChange,
    handleClear,
  } = useHashStore()

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
