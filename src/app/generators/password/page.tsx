//- src/app/generators/password/page.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Separator } from "@/components/ui/separator"
import { usePasswordStore } from "./handler"
import {
  Form2Column,
  FormArea,
  FormInputNumber,
  FormInputSubmit,
  FormInputTextareaResultArr,
  FormInputTextResult,
  FormSwitch,
} from "@/components/page/form"
import { cn } from "@/lib/utils"

const breadcrumbItems = [
  {
    label: "Generators",
  },
  {
    label: "Password",
  },
]

const StrengthBar = ({ score }: { score: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className={cn(
            "h-1.5 w-8 rounded-full transition-colors",
            score >= level
              ? score <= 2
                ? "bg-red-500"
                : score === 3
                  ? "bg-yellow-500"
                  : "bg-green-500"
              : "bg-muted",
          )}
        />
      ))}
    </div>
  )
}

const GeneratorPasswordPage = () => {
  const {
    length,
    count,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeAmbiguous,
    isGenerate,
    passwords,
    setPasswords,
    handleLengthChange,
    handleCountChange,
    handleIncludeUppercaseChange,
    handleIncludeLowercaseChange,
    handleIncludeNumbersChange,
    handleIncludeSymbolsChange,
    handleExcludeAmbiguousChange,
    handleGenerateSubmit,
    getCharsetPreview,
    getStrengthInfo,
    getPasswordStrength,
    isValid,
  } = usePasswordStore()

  const strengthInfo = getStrengthInfo()

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <form onSubmit={handleGenerateSubmit}>
          <FormArea>
            <Form2Column>
              <FormSwitch
                id="inc-uppercase"
                label="Include Uppercases (A-Z)"
                checked={includeUppercase}
                onCheckedChange={handleIncludeUppercaseChange}
              />

              <FormSwitch
                id="inc-lowercase"
                label="Include Lowercases (a-z)"
                checked={includeLowercase}
                onCheckedChange={handleIncludeLowercaseChange}
              />

              <FormSwitch
                id="inc-numbers"
                label="Include Numbers (0-9)"
                checked={includeNumbers}
                onCheckedChange={handleIncludeNumbersChange}
              />

              <FormSwitch
                id="inc-symbols"
                label="Include Symbols"
                checked={includeSymbols}
                onCheckedChange={handleIncludeSymbolsChange}
              />

              <FormSwitch
                id="exclude-ambiguous"
                label="Exclude Ambiguous (0O, l1I)"
                checked={excludeAmbiguous}
                onCheckedChange={handleExcludeAmbiguousChange}
              />

              <FormInputNumber
                id="length"
                label="Length"
                value={length}
                min={4}
                max={128}
                isDisabled={isGenerate}
                onValueChange={handleLengthChange}
              />

              <FormInputNumber
                id="count"
                label="How Many"
                value={count}
                min={1}
                max={50}
                isDisabled={isGenerate}
                onValueChange={handleCountChange}
              />
            </Form2Column>

            <FormInputTextResult
              id="charset"
              label="Character Set"
              value={getCharsetPreview()}
              readonly={true}
            />

            <FormInputSubmit
              id="submit"
              label="Generate"
              disabled={isGenerate || !isValid}
            />

            <div className="bg-background border px-3 py-4 rounded-md shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Password Strength</span>
                <span className={cn("text-sm font-medium", strengthInfo.color)}>
                  {strengthInfo.label}
                </span>
              </div>
              <StrengthBar score={strengthInfo.score} />
            </div>

            <Separator className="my-1" />

            <FormInputTextareaResultArr
              label="Passwords"
              result={passwords}
              setResult={setPasswords}
            />

            {passwords.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {passwords.map((password, index) => {
                  const info = getPasswordStrength(password)
                  return (
                    <div
                      key={index}
                      className="bg-background border px-3 py-2 flex items-center justify-between shadow-xs rounded-md"
                    >
                      <span className="font-mono text-sm truncate">{password}</span>
                      <span className={cn("text-xs font-medium ml-2", info.color)}>
                        {info.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </FormArea>
        </form>
      </AppMain>
    </>
  )
}

export default GeneratorPasswordPage
