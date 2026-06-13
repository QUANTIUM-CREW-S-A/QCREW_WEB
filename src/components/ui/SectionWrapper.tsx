import { cn } from "../../lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

export function SectionWrapper({ children, id, className, containerClassName, ...props }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-12 md:py-20 relative overflow-hidden", className)}
      {...props}
    >
      <div className={cn("container mx-auto px-4 md:px-6 relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
