import "./globals.css";
import { SettingsProvider } from "@/components/Settings/context"
import Theme from "@/app/theme";
import { Toaster } from "@/components/ui/toaster";
// No need to import fonts here anymore

export const metadata = {
  title: "Pomodoro",
  description: "Pomodoro app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <Theme>
            <Toaster />
            {children}
          </Theme>
        </SettingsProvider>
      </body>
    </html>
  );
}
