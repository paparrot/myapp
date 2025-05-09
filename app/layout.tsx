import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@/components/analytics';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '@/components/common/header';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['cyrillic'] });

export const metadata = {
  title: 'Paparrot',
  description: 'Мои заметки о путешествиях, книгах и моей жизни',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon_128x128.png',
  },
  manifest: '/manifest.json',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isTelegramBot = userAgent.includes('TelegramBot');

  if (isTelegramBot) {
    <html lang="ru">
        <head title={metadata.title} />
        <body>
          {children}
        </body>
      </html>
  }

  return (
      <html lang="ru">
      <head title={metadata.title}>
        <meta name="theme-color" content="#ff6600" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ff6600" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#ff6600" media="(prefers-color-scheme: dark)" />
      </head>
      <body
          className={`antialiased min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="max-w-2xl mx-auto py-10 px-4">
          <Header />
          <main className="pt-16">{children}</main>
        </div>
        <SpeedInsights />
        <Analytics />
      </ThemeProvider>
      </body>
      </html>
  );
}