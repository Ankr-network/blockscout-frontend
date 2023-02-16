import { ChainsItemProps } from '../ChainsItem/ChainsItemTypes';

type ToOmit =
  | 'dummyMessage'
  | 'hasConnectWalletMessage'
  | 'hasPrivateAccess'
  | 'urls';

export interface ChainsItemBaseProps extends Omit<ChainsItemProps, ToOmit> {
  chainsItemLink: React.ReactNode;
  chainsItemButton?: React.ReactNode;
}
