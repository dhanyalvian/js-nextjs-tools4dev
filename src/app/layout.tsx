//- src/app/layout.tsx

import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/core/app-sidebar"
import { AppFooter } from "@/components/core/app-layout"

const fontSans = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tools4Dev",
  description: "Tools for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>
        <ReactQueryProvider>
          <SidebarProvider>
            <AppSidebar className="shadow-xs" />

            <SidebarInset>
              {children}

              <AppFooter />
            </SidebarInset>
          </SidebarProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
