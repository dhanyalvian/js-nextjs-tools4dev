//- src/app/encoders-decoders/html/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import {
  FormArea,
  FormDropdown,
  FormInputTextarea,
  FormInputTextareaResult,
} from "@/components/page/form"
import { Separator } from "@/components/ui/separator"
import { useHtmlStore } from "./handler"

const breadcrumbItems = [
  {
    label: "Encoders / Decoders",
  },
  {
    label: "HTML",
  },
]

const EncoderDecoderHtmlPage = () => {
  const {
    conversionValue,
    inputVal,
    outputVal,
    outputCopied,
    setOutputVal,
    setOutputCopied,
    handleDropdownConversionChange,
    handleInputChange,
  } = useHtmlStore()

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
            onValueChange={(value) => handleDropdownConversionChange(
              value,
              inputVal,
              outputVal,
            )}
          />

          <FormInputTextarea
            id="input-text"
            label="Input"
            value={inputVal}
            isDisabled={false}
            onValueChange={(value) => handleInputChange(value)}
            className="font-mono"
          />

          <Separator className="my-1" />

          <FormInputTextareaResult
            label="Output"
            result={outputVal}
            setResult={setOutputVal}
            isCopied={outputCopied}
            setIsCopied={setOutputCopied}
            className="font-mono"
          />
        </FormArea>
      </AppMain>
    </>
  )
}

export default EncoderDecoderHtmlPage
