//- src/components/core/app-sidebar.tsx

"use client"

import * as React from "react"
import { CodeXml } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/core/nav-main"
import { NavSecondary } from "@/components/core/nav-secondary"
import { dataNav } from "@/data/nav"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/" aria-label="Dashboard">
                <CodeXml className="size-5!" />
                <span className="text-base font-semibold mt-0.5">Tools4Dev</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain menus={dataNav.navMain} />
        <NavSecondary menus={dataNav.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
