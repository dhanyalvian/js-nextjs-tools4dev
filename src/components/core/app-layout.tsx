//- src/components/core/app-layout.tsx

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";

interface Item {
  label: string,
  href?: string,
}

interface AppHeaderProps {
  breadcrumbItems?: Item[],
}

const AppHeader = ({ breadcrumbItems }: AppHeaderProps) => {
  const BreadcrumbItems: Item[] = [{
    label: "Tools4Dev",
    href: "/",
  }]

  if (breadcrumbItems) {
    BreadcrumbItems.push(...breadcrumbItems)
  }

  return (
    <header className="flex h-15 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-15 bg-main">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 size-9" />

        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {BreadcrumbItems?.map((item, index) => {
              const isLast = index === BreadcrumbItems.length - 1

              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="hidden md:block">
                    {item.href ? (
                      <BreadcrumbLink
                        href={item.href}
                        className="text-md font-semibold text-foreground hover:underline"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-md font-semibold">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

const AppMain = ({ children }: { children?: React.ReactNode }) => {
  return <main className="flex-1 justify-between w-full p-4 pt-0 bg-main">{children}</main>
}

const AppFooter = () => {
  return (
    <footer className="min-h-8 pb-4 text-center text-xs bg-main text-gray-600">
      © 2025 <Link href="https://github.com/dhanyalvian/js-nextjs-tools4dev" className="font-semibold hover:underline" target="blank">Tools4Dev</Link>. All rights reserved.
    </footer>
  )
}

export { AppHeader, AppMain, AppFooter }
