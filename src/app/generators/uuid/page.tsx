//- src/app/generators/uuid/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import {
  Form2Column,
  FormInputSubmit,
  FormInputNumber,
  FormInputTextareaResultArr,
  FormSwitch,
} from "@/components/page/form"
import { Separator } from "@/components/ui/separator"
import { useUuidStore } from "./handler"

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "UUID",
  },
]

const GeneratorUuidPage = () => {
  const {
    isUppercase,
    isGenerate,
    count,
    resultArr,
    setResultArr,
    handleUppercaseChange,
    handleCountChange,
    handleGenerateSubmit,
  } = useUuidStore()

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <form onSubmit={handleGenerateSubmit}>
          <div className="flex flex-1 flex-col gap-4 pt-0">
            <Form2Column>
              <FormSwitch
                id="uppercase"
                label="Uppercase"
                checked={isUppercase}
                onCheckedChange={handleUppercaseChange}
              />

              <FormInputNumber
                id="count"
                label="How Many"
                value={count}
                min={1}
                max={50}
                isDisabled={isGenerate}
                onValueChange={(e) => handleCountChange(Number(e))}
              />
            </Form2Column>

            <FormInputSubmit
              id="submit"
              label="Generate"
              disabled={isGenerate}
            />

            <Separator className="my-1" />

            <FormInputTextareaResultArr
              label="UUIDs"
              result={resultArr}
              setResult={setResultArr}
            />
          </div>
        </form>
      </AppMain>
    </>
  )
}

export default GeneratorUuidPage
