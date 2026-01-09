//- src/app/generators/uuid/state.ts

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export const useUuidStore = () => {
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

  return {
    isUppercase,
    isGenerate,
    count,
    resultArr,
    setIsUppercase,
    setIsGenerate,
    setCount,
    setResultArr,
    handleUppercaseChange,
    handleCountChange,
    handleGenerateSubmit,
  }
}
