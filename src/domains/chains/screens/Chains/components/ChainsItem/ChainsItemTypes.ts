export interface ChainsItemProps {
  logoSrc: string;
  name: string;
  description?: string;
  period: string;
  links: string[];
  onButtonClick: () => void;
  hasWalletButton: boolean;
  isWalletConnectButtonActive: boolean;
  onNetworkAdd: () => void;
}
