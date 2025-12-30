//- src/components/page/form.tsx

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { InputGroup } from "../ui/input-group"
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
            // placeholder={min.toString()}
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

interface FormButtonSubmitProps {
  id: string,
  label: string,
  disabled: boolean,
}
export const FormButtonSubmit = ({ id, label, disabled }: FormButtonSubmitProps) => {
  return (
    <div>
      <Button
        id={id}
        variant="default"
        size="lg"
        className="rounded-sm shadow-xs"
        disabled={disabled}
        type="submit"
      >
        {label}
      </Button>
    </div>
  )
}
