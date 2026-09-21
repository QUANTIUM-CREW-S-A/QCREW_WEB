import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";
import { useMagneticHover } from "../../hooks/useMagneticHover";

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
  > {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, onMouseMove, onMouseLeave, ...props }, ref) => {
    const magnetic = useMagneticHover();

    const variants = {
      primary: "bg-rack-ink text-rack-paper hover:bg-rack-brand border border-transparent",
      secondary: "bg-rack-brand text-rack-paper hover:bg-rack-brand/90 border border-transparent",
      outline: "border border-rack-rule text-rack-ink hover:border-rack-edge hover:bg-rack-sheet",
      ghost: "text-rack-graph hover:text-rack-ink hover:bg-rack-sheet",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={mergeRefs(ref, magnetic.ref as React.Ref<HTMLButtonElement>)}
        style={{ x: magnetic.x, y: magnetic.y }}
        onMouseMove={(e) => {
          magnetic.onMouseMove(e);
          onMouseMove?.(e);
        }}
        onMouseLeave={(e) => {
          magnetic.onMouseLeave();
          onMouseLeave?.(e);
        }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rack-link disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
