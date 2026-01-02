// Declaración de módulo para componentes UI
declare module '@/components/ui/Button' {
  export { Button } from './Button';
}

declare module '@/components/ui/Card' {
  export { Card } from './Card';
}

declare module '@/components/ui/SectionWrapper' {
  export { SectionWrapper } from './SectionWrapper';
}

declare module '@/components/ui' {
  export { Button, Card, SectionWrapper } from './index';
}