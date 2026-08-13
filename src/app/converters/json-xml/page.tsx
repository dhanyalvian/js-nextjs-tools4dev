//- src/app/converters/json-xml/page.tsx

"use client"

import { useCallback, useRef } from "react"
import { CheckCheck, Copy, X } from "lucide-react"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import {
  Form2Column,
  FormArea,
  FormDropdown,
} from "@/components/page/form"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useJsonToXmlStore } from "./handler"

const breadcrumbItems = [
  { label: "Converters" },
  { label: "JSON → XML" },
]

interface LineNumbersTextareaProps {
  id: string
  label: string
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  onCopy?: () => void
  isCopied?: boolean
  onClear?: () => void
  className?: string
}

const LineNumbersTextarea = ({
  id,
  label,
  value,
  onChange,
  readOnly = false,
  onCopy,
  isCopied = false,
  onClear,
  className,
}: LineNumbersTextareaProps) => {
  const gutterRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const lineCount = value.split("\n").length

  const handleScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  return (
    <div className="grid w-full gap-4 bg-background h-full">
      <InputGroup className="w-full h-full">
        <InputGroupAddon align="block-start">
          <Label htmlFor={id} className="text-foreground">
            {label}
          </Label>
          {!readOnly && (
            <InputGroupButton
              variant="ghost"
              aria-label="Clear"
              className="ml-auto rounded-full"
              size="icon-xs"
              onClick={onClear}
              disabled={!value}
            >
              {value && <X />}
            </InputGroupButton>
          )}
          {readOnly && onCopy && (
            <InputGroupButton
              variant="ghost"
              aria-label="Copy to clipboard"
              className="ml-auto rounded-full"
              size="xs"
              onClick={() => {
                navigator.clipboard.writeText(value)
                onCopy()
              }}
              disabled={!value}
            >
              {value && (
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
          )}
        </InputGroupAddon>

        <div className={cn("flex flex-1 min-h-0 overflow-hidden w-full", className)}>
          <div
            ref={gutterRef}
            className="text-muted-foreground select-none border-r border-border bg-transparent overflow-hidden shrink-0 w-10 py-3 px-2 text-sm font-mono text-right leading-one"
            aria-hidden="true"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <InputGroupTextarea
            ref={textareaRef}
            id={id}
            value={value}
            readOnly={readOnly}
            className="text-muted-foreground h-full min-h-0 w-full"
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            onScroll={handleScroll}
          />
        </div>
      </InputGroup>
    </div>
  )
}

const ConverterJsonXmlPage = () => {
  const {
    indentation,
    inputVal,
    outputVal,
    outputCopied,
    setOutputCopied,
    handleInputChange,
    handleIndentationChange,
  } = useJsonToXmlStore()

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <FormArea>
          <FormDropdown
            id="indentation"
            label="Indentation"
            options={[
              { value: "2", label: "2 spaces" },
              { value: "4", label: "4 spaces" },
            ]}
            value={indentation}
            defaultValue="2"
            onValueChange={handleIndentationChange}
          />

          <Form2Column>
            <LineNumbersTextarea
              id="input-json"
              label="Input (JSON)"
              value={inputVal}
              onChange={(value) => handleInputChange(value, indentation)}
              onClear={() => handleInputChange("", indentation)}
              className="min-h-100"
            />

            <LineNumbersTextarea
              id="output-xml"
              label="Output (XML)"
              value={outputVal}
              readOnly
              onCopy={() => setOutputCopied(true)}
              isCopied={outputCopied}
              className="h-full min-h-0 flex-1"
            />
          </Form2Column>
        </FormArea>
      </AppMain>
    </>
  )
}

export default ConverterJsonXmlPage