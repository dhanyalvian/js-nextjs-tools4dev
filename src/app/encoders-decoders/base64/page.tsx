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
    conversionVal,
    encodingVal,
    inputVal,
    outputVal,
    outputCopied,
    setOutputVal,
    setOutputCopied,
    handleDropdownConversionChange,
    handleDropdownEncodingChange,
    handleInputChange,
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
              value={conversionVal}
              defaultValue="encode"
              onValueChange={(value) => handleDropdownConversionChange(
                value,
                inputVal,
                outputVal,
              )}
            />

            <FormDropdown
              id="encoding"
              label="Encoding"
              options={[
                { value: "utf-8", label: "UTF-8" },
                { value: "ascii", label: "ASCII" },
              ]}
              value={encodingVal}
              defaultValue="utf-8"
              onValueChange={(value) => handleDropdownEncodingChange(
                value as BufferEncoding,
                conversionVal,
                inputVal,
              )}
            />
          </Form2Column>

          <FormInputTextarea
            id="input-text"
            label="Input"
            value={inputVal}
            isDisabled={false}
            onValueChange={(value) => handleInputChange(
              value,
              conversionVal,
              encodingVal,
            )}
          />

          <Separator className="my-1" />

          <FormInputTextareaResult
            label="Output"
            result={outputVal}
            setResult={setOutputVal}
            isCopied={outputCopied}
            setIsCopied={setOutputCopied}
          />
        </FormArea>
      </AppMain>
    </>
  )
}

export default EncoderDecoderBase64Page
