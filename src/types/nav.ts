//- src/types/nav.ts

import { type IconSvgElement } from "@hugeicons/react"

export interface nav {
  navHome: navObj[],
  navMain: navObj[],
  navSecondary: navObj[],
}

export interface navObj {
  id: string,
  title: string,
  url: string,
  desc?: string,
  icon?: IconSvgElement,
  soon?: boolean,
  submenus?: navObj[],
  card?: boolean | true,
}
