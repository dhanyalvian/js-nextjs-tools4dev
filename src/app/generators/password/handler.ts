//- src/app/generators/password/handler.ts

"use client"

import { useState } from "react"

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeAmbiguous: boolean
  customSymbols: string
}

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const NUMBERS = "0123456789"
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?"

const AMBIGUOUS_CHARS: Record<string, string> = {
  "0": "O",
  "O": "0",
  "l": "1",
  "1": "l",
  "I": "1",
  "S": "5",
  "5": "S",
  "B": "8",
  "8": "B",
}

type StrengthLevel = "very-weak" | "weak" | "fair" | "strong" | "very-strong"

interface StrengthInfo {
  level: StrengthLevel
  label: string
  color: string
  score: number
}

function calculateStrength(password: string): StrengthInfo {
  let score = 0

  if (password.length >= 4) score += 1
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  if (password.length >= 20) score += 1

  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1

  const hasMultipleCharTypes =
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^a-zA-Z0-9]/.test(password) ? 1 : 0)

  if (hasMultipleCharTypes >= 3) score += 1
  if (hasMultipleCharTypes >= 4) score += 1

  if (score <= 3) {
    return { level: "very-weak", label: "Very Weak", color: "text-red-500", score: 1 }
  }
  if (score <= 5) {
    return { level: "weak", label: "Weak", color: "text-orange-500", score: 2 }
  }
  if (score <= 7) {
    return { level: "fair", label: "Fair", color: "text-yellow-500", score: 3 }
  }
  if (score <= 9) {
    return { level: "strong", label: "Strong", color: "text-green-500", score: 4 }
  }
  return { level: "very-strong", label: "Very Strong", color: "text-emerald-500", score: 5 }
}

function getSecureRandomNumber(max: number): number {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] % max
}

function shuffleString(str: string): string {
  const arr = str.split("")
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getSecureRandomNumber(i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join("")
}

function generatePassword(options: PasswordOptions): string {
  let charset = ""

  if (options.includeLowercase) charset += LOWERCASE
  if (options.includeUppercase) charset += UPPERCASE
  if (options.includeNumbers) charset += NUMBERS
  if (options.includeSymbols) charset += options.customSymbols || SYMBOLS

  if (options.excludeAmbiguous) {
    for (const [char, replacement] of Object.entries(AMBIGUOUS_CHARS)) {
      charset = charset.replace(new RegExp(char, "g"), replacement)
    }
  }

  if (charset.length === 0) return ""

  let password = ""
  const requiredChars: string[] = []

  if (options.includeLowercase) {
    const chars = options.excludeAmbiguous
      ? LOWERCASE.replace(/[l]/g, "1")
      : LOWERCASE
    requiredChars.push(chars[getSecureRandomNumber(chars.length)])
  }
  if (options.includeUppercase) {
    const chars = options.excludeAmbiguous
      ? UPPERCASE.replace(/[OI]/g, "0")
      : UPPERCASE
    requiredChars.push(chars[getSecureRandomNumber(chars.length)])
  }
  if (options.includeNumbers) {
    const chars = options.excludeAmbiguous
      ? NUMBERS.replace(/[0OlI]/g, "2")
      : NUMBERS
    requiredChars.push(chars[getSecureRandomNumber(chars.length)])
  }
  if (options.includeSymbols) {
    requiredChars.push(
      (options.customSymbols || SYMBOLS)[
        getSecureRandomNumber((options.customSymbols || SYMBOLS).length)
      ],
    )
  }

  const remainingLength = options.length - requiredChars.length
  for (let i = 0; i < remainingLength; i++) {
    password += charset[getSecureRandomNumber(charset.length)]
  }

  password = shuffleString(password)
  password += requiredChars.join("")
  return shuffleString(password).slice(0, options.length)
}

export const usePasswordStore = () => {
  const [length, setLength] = useState<number>(16)
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true)
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true)
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false)
  const [customSymbols, setCustomSymbols] = useState<string>(SYMBOLS)
  const [count, setCount] = useState<number>(1)
  const [isGenerate, setIsGenerate] = useState<boolean>(false)
  const [passwords, setPasswords] = useState<string[]>([])

  const handleLengthChange = (value: number) => {
    setLength(value)
  }

  const handleCountChange = (value: number) => {
    setCount(value)
  }

  const handleIncludeUppercaseChange = (value: boolean) => {
    setIncludeUppercase(value)
  }

  const handleIncludeLowercaseChange = (value: boolean) => {
    setIncludeLowercase(value)
  }

  const handleIncludeNumbersChange = (value: boolean) => {
    setIncludeNumbers(value)
  }

  const handleIncludeSymbolsChange = (value: boolean) => {
    setIncludeSymbols(value)
  }

  const handleExcludeAmbiguousChange = (value: boolean) => {
    setExcludeAmbiguous(value)
  }

  const handleCustomSymbolsChange = (value: string) => {
    setCustomSymbols(value)
  }

  const handleGenerateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGenerate(true)

    const passwordsArray: string[] = []
    const options: PasswordOptions = {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      excludeAmbiguous,
      customSymbols,
    }

    for (let i = 0; i < count; i++) {
      passwordsArray.push(generatePassword(options))
    }

    setPasswords(passwordsArray)
    setIsGenerate(false)
  }

  const getCharsetPreview = (): string => {
    let charset = ""
    if (includeLowercase) charset += LOWERCASE
    if (includeUppercase) charset += UPPERCASE
    if (includeNumbers) charset += NUMBERS
    if (includeSymbols) charset += customSymbols || SYMBOLS

    if (excludeAmbiguous) {
      for (const [char] of Object.entries(AMBIGUOUS_CHARS)) {
        charset = charset.replace(new RegExp(char, "g"), "")
      }
    }

    return charset.length > 0 ? charset : "(empty)"
  }

  const getStrengthInfo = (): StrengthInfo => {
    return calculateStrength(
      generatePassword({
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        excludeAmbiguous,
        customSymbols,
      }),
    )
  }

  const getPasswordStrength = (password: string): StrengthInfo => {
    return calculateStrength(password)
  }

  const isValid =
    includeUppercase || includeLowercase || includeNumbers || includeSymbols

  return {
    length,
    count,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeAmbiguous,
    customSymbols,
    isGenerate,
    passwords,
    setLength,
    setCount,
    setIncludeUppercase,
    setIncludeLowercase,
    setIncludeNumbers,
    setIncludeSymbols,
    setExcludeAmbiguous,
    setCustomSymbols,
    setIsGenerate,
    setPasswords,
    handleLengthChange,
    handleCountChange,
    handleIncludeUppercaseChange,
    handleIncludeLowercaseChange,
    handleIncludeNumbersChange,
    handleIncludeSymbolsChange,
    handleExcludeAmbiguousChange,
    handleCustomSymbolsChange,
    handleGenerateSubmit,
    getCharsetPreview,
    getStrengthInfo,
    getPasswordStrength,
    isValid,
  }
}
