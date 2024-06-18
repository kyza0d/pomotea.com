import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex file:text-theme-foreground bg-theme-base-darker rounded-md p-2 text-sm file:border file:hover:cursor-pointer file:hover:bg-theme-base file:px-4 file:py-2 file:mr-4 file:rounded-md file:border-theme-border file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midnight-600 disabled:cursor-not-allowed disabled:opacity-50 border border-theme-border",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
