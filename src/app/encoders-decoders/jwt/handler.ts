/**
 * JWT Encode & Decode Module
 * This module uses native Web APIs (TextEncoder, btoa, atob, crypto.subtle)
 * and works in both browser and Node.js environments (Next.js Edge & Node).
 */

import { useState } from "react";

export const useJwtStore = () => {
  const [inputToken, setInputToken] = useState("")

  const [inputAlgo, setInputAlgo] = useState<string>("HS256")

  const [resultHeader, setResultHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
  const [isCopiedResultHeader, setIsCopiedResultHeader] = useState<boolean>(false)

  const [resultPayload, setResultPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
  const [isCopiedResultPayload, setIsCopiedResultPayload] = useState<boolean>(false)

  const [resultSecret, setResultSecret] = useState("your-256-bit-secret")
  const [isCopiedResultSecret, setIsCopiedResultSecret] = useState<boolean>(false)

  return {
    inputToken,
    setInputToken,

    inputAlgo,
    setInputAlgo,

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
    isCopiedResultSecret,
    setIsCopiedResultSecret,
  }
}

/**
 * Encodes a string to Base64Url format.
 */
export function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = typeof btoa === 'function' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decodes a Base64Url formatted string to original string.
 */
export function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = typeof atob === 'function' ? atob(base64) : Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export interface JWTDecoded {
  header: Record<string, any>;
  payload: Record<string, any>;
  signature: string;
}

/**
 * Decodes a JWT token without verifying the signature.
 */
export function decodeJWT(token: string): JWTDecoded {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format. Must contain 3 parts separated by dots.');
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];

    return { header, payload, signature };
  } catch (error: any) {
    throw new Error(`Failed to decode JWT: ${error.message}`);
  }
}

/**
 * Signs the header and payload with a secret to generate a JWT token.
 * Defaults to HS256 algorithm.
 */
export async function encodeJWT(
  header: Record<string, any>,
  payload: Record<string, any>,
  secret: string
): Promise<string> {
  // Ensure alg is set
  const finalHeader = { alg: 'HS256', typ: 'JWT', ...header };

  const encodedHeader = base64UrlEncode(JSON.stringify(finalHeader));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);

  // Using Web Crypto API
  const cryptoAPI = globalThis.crypto;
  if (!cryptoAPI || !cryptoAPI.subtle) {
    throw new Error("Web Crypto API is not available in this environment.");
  }

  const cryptoKey = await cryptoAPI.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await cryptoAPI.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(dataToSign)
  );

  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  let binary = '';
  for (let i = 0; i < signatureArray.length; i++) {
    binary += String.fromCharCode(signatureArray[i]);
  }

  const signatureBase64 = typeof btoa === 'function' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64');

  const encodedSignature = signatureBase64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return `${dataToSign}.${encodedSignature}`;
}

/**
 * Verifies a JWT token with a given secret.
 */
export async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const { header, payload } = decodeJWT(token);

    // Re-encode to verify the signature
    const newSignatureToken = await encodeJWT(header, payload, secret);
    return token === newSignatureToken;
  } catch (e) {
    return false;
  }
}
