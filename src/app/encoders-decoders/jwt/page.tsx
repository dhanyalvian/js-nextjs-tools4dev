//- src/app/encoders-decoders/jwt/page.tsx

"use client"

import React, { useState, useEffect } from "react"
import { decodeJWT, encodeJWT, useJwtStore } from "./handler"
// import { ShieldCheck, ShieldAlert } from "lucide-react"
import { toast } from "sonner";
import { AppHeader, AppMain } from "@/components/core/app-layout"
import {
  Form1Column,
  Form2Column,
  FormArea,
  FormDropdown,
  FormInputTextarea,
  FormInputTextareaResult,
} from "@/components/page/form"
import { HugeiconsIcon } from "@hugeicons/react"
import { SecurityCheckIcon, SecurityWarningIcon } from "@hugeicons/core-free-icons"


const breadcrumbItems = [
  {
    label: "Encoders / Decoders",
  },
  {
    label: "JWT",
  },
]

export default function JWTTool() {
  const {
    inputToken,
    setInputToken,

    inputAlgo,

    resultHeader,
    setResultHeader,
    isCopiedResultHeader,
    setIsCopiedResultHeader,

    resultPayload,
    setResultPayload,
    isCopiedResultPayload,
    setIsCopiedResultPayload,

    resultSecret,
    setResultSecret,
  } = useJwtStore()

  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  // Update logic when token changes
  useEffect(() => {
    const updateTokenData = async () => {
      if (!inputToken) {
        setIsValid(null);
        return;
      }
      try {
        const indent = 4
        const decoded = decodeJWT(inputToken)
        setResultHeader(JSON.stringify(decoded.header, null, indent))
        setResultPayload(JSON.stringify(decoded.payload, null, indent))
        setErrorMsg("")
        // check signature by re-encoding
        try {
          const res = await encodeJWT(decoded.header, decoded.payload, resultSecret)
          setIsValid(res === inputToken)
        } catch {
          setIsValid(false)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setIsValid(false)
        setErrorMsg(e.message)
      }
    };

    updateTokenData();
  }, [inputToken, resultSecret, setResultHeader, setResultPayload])

  // Update logic when manually encoding
  const handleEncode = async () => {
    try {
      const parsedHeader = JSON.parse(resultHeader)
      const parsedPayload = JSON.parse(resultPayload)
      const newToken = await encodeJWT(parsedHeader, parsedPayload, resultSecret)
      setInputToken(newToken)
      setErrorMsg("")
      setIsValid(true)
      toast.success("JWT Encoded successfully!")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorMsg(e.message)
      toast.error("Failed to encode: " + e.message)
    }
  }

  // Generate an initial token when mounted
  useEffect(() => {
    handleEncode()
  }, [])

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <FormArea>
          <Form2Column>
            <Form1Column className="flex flex-col">
              <FormInputTextarea
                id="encoded-token"
                label="Encoded Token"
                value={inputToken}
                onValueChange={setInputToken}
                isDisabled={false}
                className="h-full min-h-0 flex-1"
              />

              <div className="mt-auto">
                {isValid === true && (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-md shadow-xs border">
                    <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} className="size-5" />
                    <span className="font-medium">Signature Verified</span>
                  </div>
                )}
                {isValid === false && inputToken.length > 0 && (
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 p-3 rounded-md shadow-xs border">
                    <HugeiconsIcon icon={SecurityWarningIcon} strokeWidth={2} className="size-5" />
                    <span className="font-medium">Invalid Signature or Format</span>
                    {errorMsg && <span className="text-sm opacity-80 ml-auto">{errorMsg}</span>}
                  </div>
                )}
              </div>
              {/* </div> */}
            </Form1Column>

            <Form1Column>
              <FormDropdown
                id="algorithm"
                label="Algorithm"
                options={[
                  { value: "HS256", label: "HS256" },
                  { value: "HS384", label: "HS384" },
                  { value: "HS512", label: "HS512" },
                  { value: "RS256", label: "RS256" },
                  { value: "RS384", label: "RS384" },
                  { value: "RS512", label: "RS512" },
                  { value: "ES256", label: "ES256" },
                  { value: "ES384", label: "ES384" },
                  { value: "ES512", label: "ES512" },
                  { value: "PS256", label: "PS256" },
                  { value: "PS384", label: "PS384" },
                  { value: "PS512", label: "PS512" },
                  { value: "EdDSA", label: "EdDSA (Ed25519)" },
                ]}
                value={inputAlgo}
                defaultValue="HS256"
              // onValueChange={(value) => handleDropdownConversionChange(
              //   value,
              //   inputVal,
              //   outputVal,
              // )}
              />

              <FormInputTextareaResult
                label="Header"
                result={resultHeader}
                setResult={setResultHeader}
                isCopied={isCopiedResultHeader}
                setIsCopied={setIsCopiedResultHeader}
                className="h-50"
              />

              <FormInputTextareaResult
                label="Payload"
                result={resultPayload}
                setResult={setResultPayload}
                isCopied={isCopiedResultPayload}
                setIsCopied={setIsCopiedResultPayload}
                className="h-50"
              />

              <FormInputTextarea
                id="verify-signature"
                label="Verify Signature"
                value={resultSecret}
                onValueChange={setResultSecret}
                isDisabled={false}
              />
            </Form1Column>
          </Form2Column>
        </FormArea>
      </AppMain>
    </>
  );
}
