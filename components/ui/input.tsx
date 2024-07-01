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
          "flex file:text-theme-foreground bg-theme-base-darker rounded-md p-2 text-sm file:hover:cursor-pointer file:hover:text-theme-base file:px-4 file:py-2 file:mr-4 file:rounded-md file:border-none file:bg-theme-base file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border focus-visible:border-theme-accent disabled:cursor-not-allowed disabled:opacity-50 border border-theme-border file:ring-1 file:-ring-offset-1 file:ring-theme-border file:hover:bg-theme-accent file:transition-colors file:duration-200",
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
