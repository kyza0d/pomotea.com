import "./globals.css";

import { ThemeProvider } from "@/components/Theme/context"
import { SettingsProvider } from "@/components/Settings/context"
import Theme from "@/app/theme";

export const metadata = {
  title: "Pomodoro",
  description: "Pomodoro app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <SettingsProvider>

          <Theme />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
