//- src/app/generators/nanoid/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Ban, CaseLower, CaseUpper, Check, Repeat1, Section, X } from "lucide-react"
import { useState } from "react"
import { customAlphabet } from "nanoid"

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "Nano ID",
  },
]

interface seedValueProps {
  number: string,
  symbol: string,
  uppercase: string,
  lowercase: string,
}

const GeneratorNanoIdPage = () => {
  const seedNumber = "0123456789"
  const seedSymbol = "_-"
  const seedUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const seedLowercase = "abcdefghijklmnopqrstuvwxyz"

  const [isIncNumber, setIsIncNumber] = useState<boolean>(true)
  const [isIncSymbol, setIsIncSymbol] = useState<boolean>(true)
  const [isIncUppercase, setIsIncUppercase] = useState<boolean>(true)
  const [isIncLowercase, setIsIncLowercase] = useState<boolean>(true)
  const [seedValue, setSeedValue] = useState<seedValueProps>({
    number: seedNumber,
    symbol: seedSymbol,
    uppercase: seedUppercase,
    lowercase: seedLowercase,
  })

  const [lengthValue, setLengthValue] = useState<number>(21)
  const [countValue, setCountValue] = useState<number>(1)
  const [isGenerate, setIsGenerate] = useState<boolean>(false)
  const [nanoids, setNanoids] = useState<string[]>([])

  const handleIncNumberChange = (value: boolean) => {
    setIsIncNumber(value)
    if (value) {
      setSeedValue({
        ...seedValue,
        number: seedNumber,
      })
    } else {
      setSeedValue({
        ...seedValue,
        number: "",
      })
    }
  }

  const handleIncSymbolChange = (value: boolean) => {
    setIsIncSymbol(value)
    if (value) {
      setSeedValue({
        ...seedValue,
        symbol: seedSymbol,
      })
    } else {
      setSeedValue({
        ...seedValue,
        symbol: "",
      })
    }
  }

  const handleIncUppercaseChange = (value: boolean) => {
    setIsIncUppercase(value)
    if (value) {
      setSeedValue({
        ...seedValue,
        uppercase: seedUppercase,
      })
    } else {
      setSeedValue({
        ...seedValue,
        uppercase: "",
      })
    }
  }

  const handleIncLowercaseChange = (value: boolean) => {
    setIsIncLowercase(value)
    if (value) {
      setSeedValue({
        ...seedValue,
        lowercase: seedLowercase,
      })
    } else {
      setSeedValue({
        ...seedValue,
        lowercase: "",
      })
    }
  }

  const handleLengthChange = (value: number) => {
    setLengthValue(value)
  }

  const handleCountChange = (value: number) => {
    setCountValue(value)
  }

  const handleGenerateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGenerate(true)
    const nanoidsArray: string[] = []

    for (let i = 0; i < countValue; i++) {
      const generatedId = customAlphabet(
        seedValue.number + seedValue.symbol + seedValue.uppercase + seedValue.lowercase,
        lengthValue,
      )
      nanoidsArray.push(generatedId())
    }

    setNanoids(nanoidsArray)
    setIsGenerate(false)
  }

  const handleClearResult = () => {
    setNanoids([])
  }

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <form onSubmit={handleGenerateSubmit}>
          <div className="flex flex-1 flex-col gap-4 pt-0">
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="bg-background w-full">
                <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
                  <Label htmlFor="inc-number" className="text-foreground">
                    Number
                  </Label>
                  <Switch
                    id="inc-number"
                    checked={isIncNumber}
                    onCheckedChange={(checked) => handleIncNumberChange(checked)}
                  />
                </InputGroup>
              </div>

              <div className="bg-background w-full">
                <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
                  <Label htmlFor="inc-symbol" className="text-foreground">
                    Symbol
                  </Label>
                  <Switch
                    id="inc-symbol"
                    checked={isIncSymbol}
                    onCheckedChange={(checked) => handleIncSymbolChange(checked)}
                  />
                </InputGroup>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-4">
              <div className="bg-background w-full">
                <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
                  <Label htmlFor="inc-uppercase" className="text-foreground">
                    Uppercase
                  </Label>
                  <Switch
                    id="inc-uppercase"
                    checked={isIncUppercase}
                    onCheckedChange={(checked) => handleIncUppercaseChange(checked)}
                  />
                </InputGroup>
              </div>

              <div className="bg-background w-full">
                <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
                  <Label htmlFor="inc-lowercase" className="text-foreground">
                    Lowercase
                  </Label>
                  <Switch
                    id="inc-lowercase"
                    checked={isIncLowercase}
                    onCheckedChange={(checked) => handleIncLowercaseChange(checked)}
                  />
                </InputGroup>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-4">
              <div className="bg-background w-full">
                <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
                  <Label htmlFor="count" className="text-foreground">
                    Length
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="8"
                      max="50"
                      placeholder="21"
                      value={lengthValue}
                      className="h-8 w-17 shadow-none"
                      disabled={isGenerate}
                      onChange={(e) => handleLengthChange(Number(e.target.value))}
                    />
                  </div>
                </InputGroup>
              </div>

              <div className="bg-background w-full">
                <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
                  <Label htmlFor="count" className="text-foreground">
                    How Many
                  </Label>

                  <div className="flex items-center gap-2">
                    <ButtonGroup>
                      <Input
                        type="number"
                        min="1"
                        max="50"
                        placeholder="1"
                        value={countValue}
                        className="h-8 w-17 shadow-none"
                        disabled={isGenerate}
                        onChange={(e) => handleCountChange(Number(e.target.value))}
                      />
                    </ButtonGroup>
                  </div>
                </InputGroup>
              </div>
            </div>

            <div className="bg-background">
              <InputGroup>
                <InputGroupInput
                  id="input-text"
                  value={seedValue.number + seedValue.symbol + seedValue.uppercase + seedValue.lowercase}
                  className="text-muted-foreground"
                  readOnly
                />
                <InputGroupAddon align="block-start">
                  <Label htmlFor="input-text" className="text-foreground">
                    Seeds
                  </Label>
                  <InputGroupButton
                    variant="ghost"
                    aria-label="Help"
                    className="ml-auto rounded-full"
                    size="icon-xs"
                  >
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div>
              <Button
                variant="default"
                size="default"
                className="rounded-sm shadow-xs"
                disabled={isGenerate || seedValue.number + seedValue.symbol + seedValue.uppercase + seedValue.lowercase === ""}
                type="submit"
              >
                {isGenerate
                  ? <><Spinner /> Generating...</>
                  : "Generate"
                }
              </Button>
            </div>

            <Separator className="my-1" />

            <div className="grid w-full gap-4 bg-background">
              <InputGroup>
                <InputGroupTextarea
                  id="input-text"
                  value={nanoids.join("\n")}
                  className="text-muted-foreground"
                  readOnly
                />
                <InputGroupAddon align="block-start">
                  <Label htmlFor="input-text" className="text-foreground">
                    Nano IDs
                  </Label>
                  {nanoids.length > 0 && (
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
        </form >
      </AppMain >
    </>
  )
}

export default GeneratorNanoIdPage
