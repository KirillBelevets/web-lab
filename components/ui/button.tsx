import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonSize = "default" | "sm" | "lg";
type ButtonVariant = "default" | "outline" | "destructive";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-4 py-2 text-base",
  sm: "px-3 py-1.5 text-sm",
  lg: "px-6 py-3 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-black text-white hover:bg-gray-800",
  outline:
    "border border-black text-black bg-transparent hover:bg-black hover:text-white",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "default", variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
