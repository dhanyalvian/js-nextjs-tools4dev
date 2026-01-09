//- src/components/page/form.tsx

import { CheckCheck, Copy, X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from "../ui/input-group"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"
import { cn } from "@/lib/utils"

export const FormArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      {children}
    </div>
  )
}

export const Form2Column = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  )
}

interface FormSwitchProps {
  id: string,
  label: string,
  checked: boolean,
  onCheckedChange: (checked: boolean) => void,
}
export const FormSwitch = ({
  id,
  label,
  checked,
  onCheckedChange,
}: FormSwitchProps) => {
  return (
    <div className="bg-background w-full">
      <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
        <Label htmlFor={id} className="text-foreground">
          {label}
        </Label>
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </InputGroup>
    </div>
  )
}

interface FormDropdownProps {
  id: string,
  label: string,
  options: { value: string, label: string }[],
  value: string,
  defaultValue?: string,
  onValueChange?: (value: string) => void,
}
export const FormDropdown = ({
  id,
  label,
  options,
  value,
  defaultValue,
  onValueChange,
}: FormDropdownProps) => {
  return (
    <div className="bg-background w-full">
      <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
        <Label htmlFor={id} className="text-foreground">
          {label}
        </Label>
        <NativeSelect
          size="sm"
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
        >
          {options.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </InputGroup>
    </div>
  )
}

interface FormInputNumberProps {
  id: string,
  label: string,
  value: number,
  min: number,
  max: number,
  isDisabled: boolean,
  onValueChange: (value: number) => void,
}
export const FormInputNumber = ({
  id,
  label,
  value,
  min,
  max,
  isDisabled,
  onValueChange,
}: FormInputNumberProps) => {
  return (
    <div className="bg-background w-full">
      <InputGroup className="px-3 py-6 flex justify-between items-center gap-2">
        <Label htmlFor={id} className="text-foreground">
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id={id}
            type="number"
            min={min}
            max={max}
            value={value}
            className="h-8 w-17 shadow-none"
            disabled={isDisabled}
            onChange={(e) => onValueChange(Number(e.target.value))}
          />
        </div>
      </InputGroup>
    </div>
  )
}

interface FormInputTextareaProps {
  id: string,
  label: string,
  value: string,
  isDisabled: boolean,
  onValueChange: (value: string) => void,
  className?: string,
}
export const FormInputTextarea = ({
  id,
  label,
  value,
  onValueChange,
  className,
}: FormInputTextareaProps) => {
  return (
    <div className="grid w-full gap-4 bg-background">
      <InputGroup>
        <InputGroupTextarea
          id={id}
          value={value}
          className={cn("text-muted-foreground", className)}
          onChange={(e) => onValueChange(e.target.value)}
        />

        <InputGroupAddon align="block-start">
          <Label htmlFor={id} className="text-foreground">
            {label}
          </Label>

          <InputGroupButton
            variant="ghost"
            aria-label="Help"
            className="ml-auto rounded-full"
            size="icon-xs"
            onClick={() => onValueChange("")}
            disabled={value === ""}
          >
            {value !== "" && (
              <X />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

interface FormInputSubmitProps {
  id: string,
  label: string,
  disabled: boolean,
}
export const FormInputSubmit = ({ id, label, disabled }: FormInputSubmitProps) => {
  return (
    <div>
      <Button
        id={id}
        variant="default"
        size="default"
        className="rounded-md shadow-xs"
        disabled={disabled}
        type="submit"
      >
        {label}
      </Button>
    </div>
  )
}

interface FormInputTextResultProps {
  id: string,
  label: string,
  value: string,
  readonly?: boolean,
  iconCopied?: boolean,
  isCopied?: boolean,
  setIsCopied?: React.Dispatch<React.SetStateAction<boolean>>,
}
export const FormInputTextResult = ({
  id,
  label,
  value,
  readonly = false,
  iconCopied = false,
  isCopied = false,
  setIsCopied,
}: FormInputTextResultProps) => {
  return (
    <div className="grid w-full gap-4 bg-background">
      <InputGroup>
        <InputGroupInput
          id={id}
          value={value}
          className="text-muted-foreground"
          readOnly={readonly}
        />
        <InputGroupAddon align="block-start">
          <Label htmlFor={id} className="text-foreground">
            {label}
          </Label>
          <InputGroupButton
            variant="ghost"
            aria-label="Copy to clipboard"
            className="ml-auto rounded-full"
            size="xs"
            onClick={() => {
              navigator.clipboard.writeText(value)
              setIsCopied?.(true)
              setTimeout(() => {
                setIsCopied?.(false)
              }, 2000)
            }}
          >
            {value.length > 0 && iconCopied && (
              isCopied
                ? (
                  <>
                    <span className="text-xs">Copied</span>
                    <CheckCheck className="transition-all duration-200" />
                  </>
                )
                : <Copy className="transition-all duration-200" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

interface FormInputTextareaResultProps {
  label: string,
  result: string,
  setResult: React.Dispatch<React.SetStateAction<string>>,
  isCopied?: boolean,
  setIsCopied?: React.Dispatch<React.SetStateAction<boolean>>,
  className?: string,
}
export const FormInputTextareaResult = ({
  label,
  result,
  isCopied = false,
  setIsCopied,
  className,
}: FormInputTextareaResultProps) => {
  return (
    <div className="grid w-full gap-4 bg-background">
      <InputGroup>
        <InputGroupTextarea
          id="input-text"
          value={result}
          className={cn("text-muted-foreground", className)}
          readOnly
        />

        <InputGroupAddon align="block-start">
          <Label htmlFor="input-text" className="text-foreground">
            {label}
          </Label>

          <InputGroupButton
            variant="ghost"
            aria-label="Help"
            className="ml-auto rounded-full"
            size="xs"
            onClick={() => {
              navigator.clipboard.writeText(result)
              setIsCopied?.(true)
              setTimeout(() => {
                setIsCopied?.(false)
              }, 2000)
            }}
            disabled={result.length === 0}
          >
            {result.length > 0 && (
              isCopied
                ? (
                  <>
                    <span className="text-xs">Copied</span>
                    <CheckCheck className="transition-all duration-200" />
                  </>
                )
                : <Copy className="transition-all duration-200" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

interface FormInputTextareaResultArrProps {
  label: string,
  result: string[],
  setResult: React.Dispatch<React.SetStateAction<string[]>>,
}
export const FormInputTextareaResultArr = ({
  label,
  result,
  setResult,
}: FormInputTextareaResultArrProps) => {
  return (
    <div className="grid w-full gap-4 bg-background">
      <InputGroup>
        <InputGroupTextarea
          id="input-text"
          value={result.join("\n")}
          className="text-muted-foreground font-mono"
          readOnly
        />

        <InputGroupAddon align="block-start">
          <Label htmlFor="input-text" className="text-foreground">
            {label}
          </Label>

          <InputGroupButton
            variant="ghost"
            aria-label="Help"
            className="ml-auto rounded-full"
            size="icon-xs"
            onClick={() => setResult([])}
            disabled={result.length === 0}
          >
            {result.length > 0 && (
              <X />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
