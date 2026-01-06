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
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "UUID",
  },
]

const GeneratorUuidPage = () => {
  const [isUppercase, setIsUppercase] = useState<boolean>(false)
  const [isGenerate, setIsGenerate] = useState<boolean>(false)
  const [count, setCount] = useState<number>(1)
  const [resultArr, setResultArr] = useState<string[]>([])

  const handleUppercaseChange = (value: boolean) => {
    setIsUppercase(value)
  }

  const handleCountChange = (value: number) => {
    setCount(value)
  }

  const handleGenerateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGenerate(true)
    const uuidsArray: string[] = []

    for (let i = 0; i < count; i++) {
      let uuid = uuidv4()
      if (isUppercase) {
        uuid = uuid.toUpperCase()
      }
      uuidsArray.push(uuid)
    }

    setResultArr(uuidsArray)
    setIsGenerate(false)
  }

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
