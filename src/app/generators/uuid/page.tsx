//- src/app/generators/uuid/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Form2Column, FormButtonSubmit, FormInputNumber, FormSwitch } from "@/components/page/form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
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
  const [uuids, setUuids] = useState<string[]>([])

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

    setUuids(uuidsArray)
    setIsGenerate(false)
  }

  const handleClearResult = () => {
    setUuids([])
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

            <FormButtonSubmit id="submit" label="Generate" disabled={isGenerate} />

            <Separator className="my-1" />

            <div className="grid w-full gap-4 bg-background">
              <InputGroup>
                <InputGroupTextarea
                  id="input-text"
                  value={uuids.join("\n")}
                  className="text-muted-foreground font-mono"
                  readOnly
                />
                <InputGroupAddon align="block-start">
                  <Label htmlFor="input-text" className="text-foreground">
                    UUIDs
                  </Label>
                  <InputGroupButton
                    variant="ghost"
                    aria-label="Help"
                    className="ml-auto rounded-full"
                    size="icon-xs"
                    onClick={handleClearResult}
                  >
                    <X />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </form>
      </AppMain>
    </>
  )
}

export default GeneratorUuidPage
