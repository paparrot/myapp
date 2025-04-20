import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Image from "next/image";

const inter = Inter({ subsets: ["cyrillic"] })

export const metadata = {
  title: "Paparrot",
  description: "Мои публичные заметки о путешествиях, книгах и моей жизни",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon_128x128.png',
  },
  manifest: '/manifest.json'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
    <head>
      <meta name="theme-color" content="#ff6600"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
      <meta name="theme-color" content="#ff6600" media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content="#ff6600" media="(prefers-color-scheme: dark)"/>
    </head>
    <body
        className={`antialiased min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 ${inter.className}`}
    >
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <Link href={'/'}>
                  <Image width={48} height={48} className={"rounded-lg"} src={"/logo.png"} alt={"Paparrot"} />
                </Link>
                <nav className="ml-auto text-sm flex font-medium space-x-6">
                  <Link className={"block"} href="/">Посты</Link>
                  <Link className={"block"} href="/about">Обо мне</Link>
                  <ModeToggle />
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <SpeedInsights/>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
