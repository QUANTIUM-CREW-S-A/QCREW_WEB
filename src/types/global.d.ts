// Declaraciones globales para módulos TypeScript
declare module '*.tsx' {
  import React from 'react';
  const component: React.FC<Record<string, unknown>>;
  export default component;
}

declare module '*.ts' {
  export * from './index';
}

// Declaraciones específicas para componentes
declare module '@/components/ui/Button' {
  export interface ButtonProps {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
  export const Button: React.FC<ButtonProps>;
}

declare module '@/components/ui/Card' {
  export interface CardProps {
    className?: string;
    children?: React.ReactNode;
    hoverEffect?: boolean;
  }
  export const Card: React.FC<CardProps>;
}

declare module '@/components/ui/SectionWrapper' {
  export interface SectionWrapperProps {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    containerClassName?: string;
  }
  export const SectionWrapper: React.FC<SectionWrapperProps>;
}