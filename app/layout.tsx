import "./globals.css";

import { ThemeProvider } from "@/components/Theme/context"
import { SettingsProvider } from "@/components/Settings/context"

import Theme from "@/app/theme";

import "@/app/fonts.css";
import "@/app/font-sizes.css";

import { Toaster } from "@/components/ui/toaster";


export const metadata = {
  title: "Pomodoro",
  description: "Pomodoro app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <SettingsProvider>
          <Toaster />
          <Theme>
            {children}
          </Theme>
        </SettingsProvider>
      </body>
    </html >
  );
}
