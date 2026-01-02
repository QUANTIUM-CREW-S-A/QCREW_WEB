import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-brand-gray border border-white/5 rounded-xl p-6 md:p-8 transition-all duration-300",
        hoverEffect && "hover:border-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/5 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
