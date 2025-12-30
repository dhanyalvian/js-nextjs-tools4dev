//- src/app/generators/uuid/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
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
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <div className="bg-background">
            <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
              <Label htmlFor="uppercase" className="text-foreground">
                Uppercase
              </Label>
              <div className="flex items-center gap-2">
                <span className="font-normal text-sm">
                  {isUppercase ? "On" : "Off"}
                </span>
                <Switch
                  id="uppercase"
                  checked={isUppercase}
                  onCheckedChange={(checked) => handleUppercaseChange(checked)}
                />
              </div>
            </InputGroup>
          </div>

          <div className="bg-background">
            <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
              <Label htmlFor="uppercase" className="text-foreground">
                Number of UUIDs
              </Label>

              <div className="flex items-center gap-2">
                <form onSubmit={handleGenerateSubmit}>
                  <ButtonGroup>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      placeholder="1"
                      value={count}
                      className="h-8 w-17 shadow-none"
                      disabled={isGenerate}
                      onChange={(e) => handleCountChange(Number(e.target.value))}
                    />
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 shadow-none"
                      disabled={isGenerate}
                      type="submit"
                    >
                      {isGenerate
                        ? <><Spinner /> Generating...</>
                        : "Generate"
                      }
                    </Button>
                  </ButtonGroup>
                </form>
              </div>
            </InputGroup>
          </div>

          <Separator className="my-1" />

          <div className="grid w-full gap-4 bg-background">
            <InputGroup>
              <InputGroupTextarea
                id="input-text"
                value={uuids.join("\n")}
                className="text-muted-foreground"
                readOnly
              />
              <InputGroupAddon align="block-start">
                <Label htmlFor="input-text" className="text-foreground">
                  UUIDs
                </Label>
                {uuids.length > 0 && (
                  <InputGroupButton
                    variant="ghost"
                    aria-label="Help"
                    className="ml-auto rounded-full"
                    size="icon-xs"
                    onClick={handleClearResult}
                  >
                    <X />
                  </InputGroupButton>
                )}
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div >
      </AppMain >
    </>
  )
}

export default GeneratorUuidPage
