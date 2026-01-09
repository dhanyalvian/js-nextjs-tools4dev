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
import { useBase64Store } from "./handler"

const breadcrumbItems = [
  {
    label: "Encoders / Decoders",
  },
  {
    label: "Base64",
  },
]

const EncoderDecoderBase64Page = () => {
  const {
    conversionValue,
    encodingValue,
    inputText,
    result,
    resultCopied,
    setEncodingValue,
    setResult,
    setResultCopied,
    handleDropdownConversionChange,
    handleInputTextChange,
  } = useBase64Store()

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
