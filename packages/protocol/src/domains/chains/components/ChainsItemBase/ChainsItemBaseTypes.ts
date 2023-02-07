import { ChainsItemQueryProps } from '../ChainsItem/ChainsItemTypes';

export interface ChainsItemBaseProps
  extends Omit<ChainsItemQueryProps, 'chainId'> {
  isHighlighted?: boolean;
  isLoading: boolean;
  totalRequests: string;
  handleButtonClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  handleOriginUrlClick: () => void;
  chainsItemLink: React.ReactNode;
  chainsItemButton?: React.ReactNode;
}
