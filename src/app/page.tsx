"use client"

import Link from "next/link"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronRightIcon, HourglassIcon } from "@hugeicons/core-free-icons"
import { navObj } from "@/types/nav"
import { dataNav } from "@/data/nav"
import { Separator } from "@/components/ui/separator"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const breadcrumbItems = [
  {
    label: "All Tools",
  },
]

const Homepage = () => {
  const navMain = dataNav.navMain

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <HomepageCardGroup groups={navMain} />
      </AppMain>
    </>
  )
}

interface HomepageCardGroupProps {
  groups: navObj[],
}
const HomepageCardGroup = ({ groups }: HomepageCardGroupProps) => {
  return (
    <>
      {groups.map((group) => {
        if (!group.submenus) {
          return
        }

        return (
          <div key={group.title} className="flex flex-col gap-0 mb-8">
            <span className="font-medium">{group.title}</span>
            <span className="text-sm text-muted-foreground">{group.desc}</span>
            <Separator className="mt-2 mb-4" />
            <HomepageCardItem items={group.submenus} />
          </div>
        )
      })}
    </>
  )
}

interface HomepageCardItemProps {
  items: navObj[],
}
const HomepageCardItem = ({ items }: HomepageCardItemProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        let itemVariant: "outline" | "muted" | "default" = "outline"
        let itemUrl = item.url
        let itemColor = "text-muted-foreground"

        if (item.soon) {
          itemVariant = "muted"
          itemUrl = "#"
          itemColor = "text-muted-foreground/50"
        }

        return (
          <Item key={item.url} variant={itemVariant} size="sm" asChild>
            <Link href={itemUrl} className="bg-card shadow-xs">
              <ItemMedia>
                <HugeiconsIcon
                  icon={item.icon}
                  strokeWidth={1.5}
                  className={`size-8 ${itemColor}`}
                />
              </ItemMedia>
              <ItemContent className="ml-1 gap-0.5 self-start">
                <ItemTitle className={itemColor}>{item.title}</ItemTitle>
                <ItemDescription className={`text-xs ${itemColor}`}>{item.desc}</ItemDescription>
              </ItemContent>
              <ItemActions className={`${item.soon && "self-start"}`}>
                {!item.soon ? (
                  <HugeiconsIcon
                    icon={ChevronRightIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                ) : (
                  <HugeiconsIcon
                    icon={HourglassIcon}
                    strokeWidth={2}
                    className="size-4 text-muted-foreground/90"
                  />
                )}
            </ItemActions>
          </Link>
          </Item>
  )
})}

    </div >
  )
}

export default Homepage
