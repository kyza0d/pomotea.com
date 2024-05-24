"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Theme() {
  const { theme, setTheme } = useTheme()

  return (
    <Select onValueChange={setTheme} value={theme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          {theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Select theme"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}
