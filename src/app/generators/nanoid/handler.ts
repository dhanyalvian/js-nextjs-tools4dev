//- src/app/generators/nanoid/state.ts

import { customAlphabet } from "nanoid"
import { useState } from "react"

interface seedValueProps {
  number: string,
  symbol: string,
  uppercase: string,
  lowercase: string,
}

export const useNanoIdStore = () => {
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

  return {
    isIncNumber,
    isIncSymbol,
    isIncUppercase,
    isIncLowercase,
    seedValue,
    lengthValue,
    countValue,
    isGenerate,
    nanoids,
    setIsIncNumber,
    setIsIncSymbol,
    setIsIncUppercase,
    setIsIncLowercase,
    setSeedValue,
    setLengthValue,
    setCountValue,
    setIsGenerate,
    setNanoids,
    handleIncNumberChange,
    handleIncSymbolChange,
    handleIncUppercaseChange,
    handleIncLowercaseChange,
    handleLengthChange,
    handleCountChange,
    handleGenerateSubmit,
  }
}
