//- src/components/core/nav-secondary.tsx

"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

export function NavSecondary({
  menus,
  ...props
}: {
  menus: {
    title: string,
    url: string,
    icon: IconSvgElement,
    soon?: boolean,
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {menus.map((menu) => (
            <SidebarMenuItem key={menu.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === menu.url}
                className={`${menu.soon ? "text-muted-foreground" : ""}`}
              >
                <Link href={menu.url}>
                  <HugeiconsIcon icon={menu.icon} color="currentColor" strokeWidth={2} />
                  <span>{menu.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
