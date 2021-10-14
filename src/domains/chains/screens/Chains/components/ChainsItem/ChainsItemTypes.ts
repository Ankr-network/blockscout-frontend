export interface ChainsItemProps {
  logoSrc: string;
  name: string;
  description?: string;
  period: string;
  links: string[];
  onButtonClick: () => void;
}
