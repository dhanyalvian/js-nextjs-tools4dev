//- src/components/core/nav-main.tsx

"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  menus,
}: {
  menus: {
    title: string,
    url: string,
    icon?: LucideIcon,
    demo?: boolean,
    submenus?: {
      title: string,
      url: string,
      icon?: LucideIcon,
      demo?: boolean,
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menus.map((menu) => {
          return (
            (menu.submenus && menu.submenus.length > 0) ? (
              <Collapsible
                key={menu.title}
                asChild
                className="group/collapsible"
                defaultOpen={menu.submenus?.some((submenu) => submenu.url === pathname)}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={menu.title} className={`${menu.demo ? "" : "text-neutral-400"}`}>
                      {menu.icon && <menu.icon />}
                      <span>{menu.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.submenus?.map((submenu) => (
                        <SidebarMenuSubItem key={submenu.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`${submenu.demo ? "" : "text-neutral-400"}`}
                            isActive={pathname === submenu.url}
                          >
                            <Link href={submenu.url}>
                              {submenu.icon && (
                                submenu.demo || pathname === submenu.url ? (
                                  <submenu.icon />
                                ) : (
                                  <submenu.icon color="#a1a1a1" />
                                )
                              )}
                              <span>{submenu.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={menu.title} data-active={true}>
                <SidebarMenuButton
                  asChild
                  tooltip={menu.title}
                  isActive={pathname === menu.url}
                  className={`${menu.demo ? "" : "text-neutral-400"}`}
                >
                  <Link href={menu.url}>
                    {menu.icon && <menu.icon />}
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
