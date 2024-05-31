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
    <html lang="en">
      <body>
        <SettingsProvider>
          <Toaster />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Theme>
              {children}
            </Theme>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html >
  );
}
