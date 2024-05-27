import "./globals.css";

import { ThemeProvider } from "@/components/Theme/context"
import { SettingsProvider } from "@/components/Settings/context"

import Theme from "@/app/theme";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Pomodoro",
  description: "Pomodoro app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <Header /> */}
        <SettingsProvider>

          <Theme />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
