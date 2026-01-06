//- src/app/generators/nanoid/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { customAlphabet } from "nanoid"
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
