//- src/components/core/nav-main.tsx

"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronRightIcon } from "@hugeicons/core-free-icons"
import { navObj } from "@/types/nav"
import { cn } from "@/lib/utils"

interface NavMainProps {
  menus: navObj[],
}

export const NavMain = ({ menus }: NavMainProps) => {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-0.5">
        {menus.map((menu) => {
          return (
            (menu.submenus && menu.submenus.length > 0) ? (
              <Collapsible
                key={menu.title}
                asChild
                className="group/collapsible"
                defaultOpen={menu.submenus?.some((submenu) => submenu.url === pathname) || !menu.soon}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={menu.title}
                      className={`${menu.soon ? "text-muted-foreground/70" : ""}`}
                    >
                      {menu.icon && <HugeiconsIcon icon={menu.icon} className="nav-icon" />}
                      <span>{menu.title}</span>
                      <HugeiconsIcon
                        icon={ChevronRightIcon}
                        strokeWidth={2}
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub className="gap-0.5">
                      {menu.submenus?.map((submenu) => (
                        <SidebarMenuSubItem key={submenu.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === submenu.url}
                            className={`${submenu.soon ? "text-muted-foreground/70" : ""}`}
                          >
                            <Link href={submenu.url}>
                              {submenu.icon &&
                                <HugeiconsIcon
                                  icon={submenu.icon}
                                  className="nav-icon"
                                />
                              }
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
                  className={`${menu.soon ? "text-muted-foreground/70" : ""}`}
                >
                  <Link href={menu.url}>
                    {menu.icon && <HugeiconsIcon icon={menu.icon} strokeWidth={2} />}
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

export const NavMainNew = ({ menus }: NavMainProps) => {
  const pathname = usePathname()

  return (
    <SidebarGroup className="py-0 px-1.5">
      <SidebarMenu>
        {menus.map((menu) => {
          if (menu.soon) {
            return
          }

          return (
            <div key={menu.id} className="mb-4">
              {menu.title && (
                <SidebarGroupLabel
                  className={cn(
                    "h-auto py-0 pb-1",
                    "uppercase text-xs-min text-sidebar-header-title font-semibold",
                  )}
                >
                  {menu.title}
                </SidebarGroupLabel>
              )}

              <SidebarMenu className="gap-0.5">
                {menu.submenus?.map((submenu) => {
                  if (submenu.soon) {
                    return
                  }

                  return (
                    <SidebarMenuItem key={submenu.title} data-active={true} className="m-0">
                      <SidebarMenuButton
                        asChild
                        tooltip={submenu.title}
                        isActive={pathname === submenu.url}
                        className={`font-[450] rounded-sm overflow-visible`}
                      >
                        <Link href={submenu.url}>
                          {submenu.icon && (
                            <HugeiconsIcon
                              icon={submenu.icon}
                              strokeWidth={1.5}
                              className="nav-icon text-sidebar-icon"
                            />
                          )}
                          <span className="text-xs-plus font-medium">
                            {submenu.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </div>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
