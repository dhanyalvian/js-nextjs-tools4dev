//- src/hooks/use-copy.ts

export const CopyToClipboard = (copyText: string) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyText)
    } else {
      const tempTextArea = document.createElement('textarea')
      tempTextArea.value = copyText
      tempTextArea.style.position = 'fixed'
      tempTextArea.style.left = '-9999px'
      tempTextArea.style.top = '0'
      document.body.appendChild(tempTextArea)
      tempTextArea.focus()
      tempTextArea.select()
      document.execCommand('copy')
      document.body.removeChild(tempTextArea)
    }
  } catch (error) {
    console.error("Failed to copy text:", error)
  }
}
