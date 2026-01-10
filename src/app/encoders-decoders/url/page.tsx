//- src/app/encoders-decoders/url/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import {
  FormArea,
  FormDropdown,
  FormInputTextarea,
  FormInputTextareaResult,
} from "@/components/page/form"
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
    conversionVal,
    inputVal,
    outputVal,
    outputCopied,
    setOutputVal,
    setOutputCopied,
    handleDropdownConversionChange,
    handleInputChange,
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
            value={conversionVal}
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
            onValueChange={(value) => handleInputChange(
              value,
              conversionVal,
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

export default EncoderDecoderUrlPage
