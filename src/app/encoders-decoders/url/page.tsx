//- src/app/encoders-decoders/url/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { FormArea, FormDropdown, FormInputTextarea, FormInputTextareaResult } from "@/components/page/form"
import { Separator } from "@/components/ui/separator"
import { useUrlStore } from "./handler"

const breadcrumbItems = [
  {
    label: "Encoders / Decoders",
  },
  {
    label: "URL",
  },
]

const EncoderDecoderUrlPage = () => {
  const {
    conversionValue,
    inputText,
    result,
    resultCopied,
    setResult,
    setResultCopied,
    handleDropdownConversionChange,
    handleInputTextChange,
  } = useUrlStore()

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <FormArea>
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

          <FormInputTextarea
            id="input-text"
            label="Input"
            value={inputText}
            isDisabled={false}
            onValueChange={handleInputTextChange}
            className="font-mono"
          />

          <Separator className="my-1" />

          <FormInputTextareaResult
            label="Output"
            result={result}
            setResult={setResult}
            isCopied={resultCopied}
            setIsCopied={setResultCopied}
            className="font-mono"
          />
        </FormArea>
      </AppMain>
    </>
  )
}

export default EncoderDecoderUrlPage
