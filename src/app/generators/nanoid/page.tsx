//- src/app/generators/nanoid/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Separator } from "@/components/ui/separator"
import { useNanoIdStore } from "./handler"
import {
  Form2Column,
  FormArea,
  FormInputNumber,
  FormInputSubmit,
  FormInputTextareaResultArr,
  FormInputTextResult,
  FormSwitch,
} from "@/components/page/form"

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "Nano ID",
  },
]

const GeneratorNanoIdPage = () => {
  const {
    isIncNumber,
    isIncSymbol,
    isIncUppercase,
    isIncLowercase,
    seedValue,
    lengthValue,
    countValue,
    isGenerate,
    nanoids,
    setNanoids,
    handleIncNumberChange,
    handleIncSymbolChange,
    handleIncUppercaseChange,
    handleIncLowercaseChange,
    handleLengthChange,
    handleCountChange,
    handleGenerateSubmit,
  } = useNanoIdStore()

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <form onSubmit={handleGenerateSubmit}>
          <FormArea>
            <Form2Column>
              <FormSwitch
                id="inc-number"
                label="Include Numbers"
                checked={isIncNumber}
                onCheckedChange={handleIncNumberChange}
              />

              <FormSwitch
                id="inc-symbol"
                label="Include Symbols"
                checked={isIncSymbol}
                onCheckedChange={handleIncSymbolChange}
              />

              <FormSwitch
                id="inc-uppercase"
                label="Include Uppercases"
                checked={isIncUppercase}
                onCheckedChange={handleIncUppercaseChange}
              />

              <FormSwitch
                id="inc-lowercase"
                label="Include Lowercases"
                checked={isIncLowercase}
                onCheckedChange={handleIncLowercaseChange}
              />

              <FormInputNumber
                id="length"
                label="Length"
                value={lengthValue}
                min={8}
                max={50}
                isDisabled={isGenerate}
                onValueChange={handleLengthChange}
              />

              <FormInputNumber
                id="count"
                label="How Many"
                value={countValue}
                min={1}
                max={50}
                isDisabled={isGenerate}
                onValueChange={handleCountChange}
              />
            </Form2Column>

            <FormInputTextResult
              id="seeds"
              label="Seeds"
              value={seedValue.number + seedValue.symbol + seedValue.uppercase + seedValue.lowercase}
              readonly={true}
            />

            <FormInputSubmit
              id="submit"
              label="Generate"
              disabled={isGenerate || seedValue.number + seedValue.symbol + seedValue.uppercase + seedValue.lowercase === ""}
            />

            <Separator className="my-1" />

            <FormInputTextareaResultArr
              label="Nano IDs"
              result={nanoids}
              setResult={setNanoids}
            />
          </FormArea>
        </form>
      </AppMain>
    </>
  )
}

export default GeneratorNanoIdPage
