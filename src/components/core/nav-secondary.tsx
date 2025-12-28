//- src/components/core/nav-secondary.tsx

"use client"

import * as React from "react"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavSecondary({
  menus,
  ...props
}: {
  menus: {
    title: string,
    url: string,
    icon: LucideIcon,
    demo?: boolean,
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
                className={`${menu.demo ? "" : "text-neutral-400"}`}
              >
                <Link href={menu.url}>
                  <menu.icon />
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
