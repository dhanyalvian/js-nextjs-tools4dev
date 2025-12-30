//- src/components/page/form.tsx

import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "../ui/input-group"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

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
export const FormSwitch = ({ id, label, checked, onCheckedChange }: FormSwitchProps) => {
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

interface FormInputNumberProps {
  id: string,
  label: string,
  value: number,
  min: number,
  max: number,
  isDisabled: boolean,
  onValueChange: (value: number) => void,
}
export const FormInputNumber = ({ id, label, value, min, max, isDisabled, onValueChange }: FormInputNumberProps) => {
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

interface FormInputTextareaResultProps {
  label: string,
  result: string[],
  setResult: React.Dispatch<React.SetStateAction<string[]>>,
}
export const FormInputTextareaResult = ({
  label,
  result,
  setResult,
}: FormInputTextareaResultProps) => {
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
