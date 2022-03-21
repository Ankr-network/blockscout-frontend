export interface RpcItemProps {
  logoSrc: string;
  name: string;
  description: string;
  period: string;
  links: string[];
  className?: string;
  extraDescription?: string;
  extraLabel?: string;
  onClick?: () => void;
}
