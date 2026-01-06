//- src/app/encoders-decoders/base64/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import {
  Form2Column,
  FormArea,
  FormDropdown,
  FormInputTextarea,
  FormInputTextareaResult,
} from "@/components/page/form"
import { Separator } from "@/components/ui/separator"
import { Base64Encode, Base64Decode } from "@/lib/base64"
import { useState } from "react"

const breadcrumbItems = [
  {
    label: "Encoders / Decoders",
  },
  {
    label: "Base64",
  },
]
const secretKey = ""

const EncoderDecoderBase64Page = () => {
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

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <FormArea>
          <Form2Column>
            <FormDropdown
              id="conversion"
              label="Conversion"
              options={[
                { value: "encode", label: "Encode" },
                { value: "decode", label: "Decode" },
              ]}
              value={conversionValue}
              defaultValue="encode"
              onValueChange={handleDropdownConversionChange}
            />

            <FormDropdown
              id="encoding"
              label="Encoding"
              options={[
                { value: "utf-8", label: "UTF-8" },
                { value: "ascii", label: "ASCII" },
              ]}
              value={encodingValue}
              defaultValue="utf-8"
              onValueChange={(val) => setEncodingValue(val as BufferEncoding)}
            />
          </Form2Column>

          <FormInputTextarea
            id="input-text"
            label="Input Text"
            value={inputText}
            isDisabled={false}
            onValueChange={handleInputTextChange}
          />

          <Separator className="my-1" />

          <FormInputTextareaResult
            label="Result"
            result={result}
            setResult={setResult}
            isCopied={resultCopied}
            setIsCopied={setResultCopied}
          />
        </FormArea>
      </AppMain>
    </>
  )
}

export default EncoderDecoderBase64Page
function base64encode(value: string) {
  throw new Error("Function not implemented.")
}

