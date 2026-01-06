//- src/lib/base64.ts

export const Base64Encode = (
  str: string,
  encoding: BufferEncoding = "utf-8",
) => {
  if (typeof window === "undefined") {
    // Server Side (Node.js)
    return Buffer.from(str, encoding).toString("base64")
  } else {
    // Client Side (Browser)
    if (encoding === "ascii") {
      // Membersihkan karakter non-ASCII (di atas 127) sebelum encode
      const asciiStr = str.replace(/[^\x00-\x7F]/g, "")
      return window.btoa(asciiStr)
    }
    // Default UTF-8 untuk Browser
    return window.btoa(unescape(encodeURIComponent(str)))
  }
}

export const Base64Decode = (
  str: string,
  encoding: BufferEncoding = "utf-8",
) => {
  if (typeof window === "undefined") {
    // Server Side (Node.js)
    return Buffer.from(str, "base64").toString(encoding)
  } else {
    // Client Side (Browser)
    const decoded = window.atob(str)
    if (encoding === "ascii") return decoded

    // Default UTF-8 untuk Browser
    return decodeURIComponent(escape(decoded))
  }
}
