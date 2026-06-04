//- src/data/nav.ts

import {
  SettingsIcon,
  LeftToRightListNumberIcon,
  WebProgrammingIcon,
  Link01Icon,
  DatabaseSyncIcon,
  SecurityCheckIcon,
  ServerStack01Icon,
  HashtagIcon,
  PasswordValidationIcon,
  GlobeLockIcon,
  BarcodeIcon,
  ArrowDataTransferHorizontalIcon,
  Calendar1Icon,
  RepostIcon,
  RulerIcon,
  MenuSquareIcon,
  Clock4Icon,
  BracesIcon,
  SqlIcon,
  SourceCodeSquareIcon,
  AiBeautifyIcon,
  TextSmallcapsIcon,
  InputLongTextIcon,
  TextIcon,
  RegexIcon,
  MoreVerticalSquare02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons"

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
      icon: MenuSquareIcon,
    },
    {
      title: "Converters",
      url: "#",
      icon: ArrowDataTransferHorizontalIcon,
      soon: true,
      submenus: [
        {
          title: "Number",
          url: "/converters/number",
          icon: LeftToRightListNumberIcon,
          soon: true,
        },
        {
          title: "Unit",
          url: "/converters/unit",
          icon: RulerIcon,
          soon: true,
        },
        {
          title: "Date",
          url: "/converters/date",
          icon: Calendar1Icon,
          soon: true,
        },
        {
          title: "Timestamp",
          url: "/converters/timestamp",
          icon: Clock4Icon,
          soon: true,
        },
      ],
    },
    {
      title: "Encoders / Decoders",
      url: "#",
      icon: RepostIcon,
      submenus: [
        {
          title: "HTML",
          url: "/encoders-decoders/html",
          icon: WebProgrammingIcon,
        },
        {
          title: "URL",
          url: "/encoders-decoders/url",
          icon: Link01Icon,
        },
        {
          title: "Base64",
          url: "/encoders-decoders/base64",
          icon: DatabaseSyncIcon,
        },
        {
          title: "JWT",
          url: "/encoders-decoders/jwt",
          icon: SecurityCheckIcon,
        },
      ],
    },
    {
      title: "Formatters",
      url: "#",
      icon: AiBeautifyIcon,
      soon: true,
      submenus: [
        {
          title: "JSON",
          url: "/formatters/json",
          icon: BracesIcon,
          soon: true,
        },
        {
          title: "SQL",
          url: "/formatters/sql",
          icon: SqlIcon,
          soon: true,
        },
        {
          title: "XML",
          url: "/formatters/xml",
          icon: SourceCodeSquareIcon,
          soon: true,
        },
      ],
    },
    {
      title: "Generators",
      url: "#",
      icon: ServerStack01Icon,
      submenus: [
        {
          title: "Hash",
          url: "/generators/hash",
          icon: HashtagIcon,
        },
        {
          title: "Password",
          url: "/generators/password",
          icon: PasswordValidationIcon,
          soon: true,
        },
        {
          title: "UUID",
          url: "/generators/uuid",
          icon: GlobeLockIcon,
        },
        {
          title: "Nano ID",
          url: "/generators/nanoid",
          icon: BarcodeIcon,
        },
      ],
    },
    {
      title: "Text",
      url: "#",
      icon: TextIcon,
      soon: true,
      submenus: [
        {
          title: "Escape / Unescape",
          url: "/text/escape-unescape",
          icon: InputLongTextIcon,
          soon: true,
        },
        {
          title: "Inspector / Case Converter",
          url: "/text/inspector-case-converter",
          icon: TextSmallcapsIcon,
          soon: true,
        },
        {
          title: "Regex Tester",
          url: "/text/regex-tester",
          icon: RegexIcon,
          soon: true,
        },
        {
          title: "Text Compare",
          url: "/text/text-compare",
          icon: MoreVerticalSquare02Icon,
          soon: true,
        },
        {
          title: "Markdown Preview",
          url: "/text/markdown-preview",
          icon: ViewIcon,
          soon: true,
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
      soon: true,
    },
  ],
  navSecondary: [],
}
