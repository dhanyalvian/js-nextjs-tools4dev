//- src/data/nav.ts

import {
  Settings,
  Home,
  Binary,
  Code,
  Link,
  ArrowDown10,
  Loader,
  ServerCrash,
  Fingerprint,
  KeySquare,
  GlobeLock,
  Barcode,
  ArrowLeftRight,
  CalendarDays,
  Recycle,
  Ruler,
} from "lucide-react";

export const dataNav = {
  user: {
    name: "Dhany Noor Alfian",
    email: "dhanyalvian@gmail.com",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJikhQikH8XnIA7RW9BrDglLF-6q_FafJW020U2sjC_rBDkjv96=s96-c",
  },
  navMain: [
    {
      title: "All Tools",
      url: "/",
      icon: Home,
      demo: true,
    },
    {
      title: "Converters",
      url: "#",
      icon: ArrowLeftRight,
      submenus: [
        {
          title: "Number",
          url: "/converters/number",
          icon: Binary,
        },
        {
          title: "Unit",
          url: "/converters/unit",
          icon: Ruler,
        },
        {
          title: "Date",
          url: "/converters/date",
          icon: CalendarDays,
        },
      ],
    },
    {
      title: "Encoders / Decoders",
      url: "#",
      icon: Recycle,
      demo: true,
      submenus: [
        {
          title: "HTML",
          url: "/encoders-decoders/html",
          icon: Code,
        },
        {
          title: "URL",
          url: "/encoders-decoders/url",
          icon: Link,
        },
        {
          title: "Base64",
          url: "/encoders-decoders/base64",
          icon: ArrowDown10,
          demo: true,
        },
        {
          title: "JWT",
          url: "/encoders-decoders/jwt",
          icon: Loader,
        },
      ],
    },
    {
      title: "Generators",
      url: "#",
      icon: ServerCrash,
      demo: true,
      submenus: [
        {
          title: "Hash",
          url: "/generators/hash",
          icon: Fingerprint,
          demo: true,
        },
        {
          title: "Password",
          url: "/generators/password",
          icon: KeySquare,
        },
        {
          title: "UUID",
          url: "/generators/uuid",
          icon: GlobeLock,
          demo: true,
        },
        {
          title: "Nano ID",
          url: "/generators/nanoid",
          icon: Barcode,
          demo: true,
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  navSecondary: [],
}
