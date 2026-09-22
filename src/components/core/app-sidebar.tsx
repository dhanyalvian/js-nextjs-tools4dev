//- src/components/core/app-sidebar.tsx

"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CodeXmlIcon } from "@hugeicons/core-free-icons"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMainNew } from "@/components/core/nav-main"
import { dataNav } from "@/data/nav"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!" asChild>
              <Link href="/" aria-label="All Tools">
                <HugeiconsIcon icon={CodeXmlIcon} strokeWidth={2} className="size-5.5!" />
                <span className="text-base text-foreground font-semibold mt-0.5">Tools4Dev</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-2 mt-2">
        <NavMainNew menus={dataNav.navHome} />
        <NavMainNew menus={dataNav.navMain} />
        {/* <NavSecondary menus={dataNav.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
