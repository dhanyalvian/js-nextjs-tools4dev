//- src/components/core/nav-main.tsx

"use client"

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
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { ChevronRightIcon } from "@hugeicons/core-free-icons"

export function NavMain({
  menus,
}: {
  menus: {
    title: string,
    url: string,
    icon?: IconSvgElement,
    soon?: boolean,
    submenus?: {
      title: string,
      url: string,
      icon?: IconSvgElement,
      soon?: boolean,
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
                    <SidebarMenuButton
                      tooltip={menu.title}
                      className={`${menu.soon ? "text-muted-foreground/70" : ""}`}
                    >
                      {menu.icon && <HugeiconsIcon icon={menu.icon} strokeWidth={2} />}
                      <span>{menu.title}</span>
                      <HugeiconsIcon
                        icon={ChevronRightIcon}
                        strokeWidth={2}
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub>
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
                                  strokeWidth={2}
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
