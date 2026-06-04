"use client"

import Link from "next/link"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BinaryIcon,
  RulerIcon,
  CalendarDaysIcon,
  Link01Icon,
  ArrowDownToLineIcon,
  LoaderPinwheelIcon,
  Key01Icon,
  GlobeLockIcon,
  BarcodeIcon,
  FingerprintPatternIcon,
  WebProgrammingIcon,
} from "@hugeicons/core-free-icons"

const breadcrumbItems = [
  {
    label: "Tools for Developer",
  },
]

const toolsData = [
  {
    group: "Converters",
    items: [
      { title: "Number", href: "/converters/number", icon: BinaryIcon },
      { title: "Unit", href: "/converters/unit", icon: RulerIcon },
      { title: "Date", href: "/converters/date", icon: CalendarDaysIcon },
    ],
  },
  {
    group: "Encoders / Decoders",
    items: [
      { title: "HTML", href: "/encoders-decoders/html", icon: WebProgrammingIcon },
      { title: "URL", href: "/encoders-decoders/url", icon: Link01Icon },
      { title: "Base64", href: "/encoders-decoders/base64", icon: ArrowDownToLineIcon },
      { title: "JWT", href: "/encoders-decoders/jwt", icon: LoaderPinwheelIcon },
    ],
  },
  {
    group: "Generators",
    items: [
      { title: "Hash", href: "/generators/hash", icon: FingerprintPatternIcon },
      { title: "Password", href: "/generators/password", icon: Key01Icon },
      { title: "UUID", href: "/generators/uuid", icon: GlobeLockIcon },
      { title: "Nano ID", href: "/generators/nanoid", icon: BarcodeIcon },
    ],
  },
]

export default function Home() {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolsData.map((group) =>
            group.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full transition-colors hover:bg-muted/50 cursor-pointer">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <HugeiconsIcon icon={item.icon} strokeWidth={1.5} className="size-8 text-muted-foreground" />
                    <div className="ml-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-xs text-muted-foreground font-normal">{group.group}</p>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))
          )}
        </div>
      </AppMain>
    </>
  )
}
