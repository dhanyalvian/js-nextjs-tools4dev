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
      title: "Encoders / Decoders",
      url: "#",
      icon: Binary,
      submenus: [
        {
          title: "HTML",
          url: "/encode-decode/html",
          icon: Code,
        },
        {
          title: "URL",
          url: "/encode-decode/url",
          icon: Link,
        },
        {
          title: "Base64 Text",
          url: "/encode-decode/base64",
          icon: ArrowDown10,
        },
        {
          title: "JWT",
          url: "/encode-decode/jwt",
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
        },
        {
          title: "NanoID",
          url: "/generators/nanoid",
          icon: Barcode,
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
