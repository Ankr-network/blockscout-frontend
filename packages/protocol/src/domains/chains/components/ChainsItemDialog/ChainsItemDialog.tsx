import { ChainsItemDialogBase } from './ChainsItemDialogBase';
import { chainDialogContent } from './ChainDialogUtils';

export interface IChainsItemDialogProps {
  open: boolean;
  onClose: () => void;
  onTrack?: () => void;
}

export const ChainsItemDialog = (props: IChainsItemDialogProps) => (
  <ChainsItemDialogBase content={chainDialogContent} {...props} />
);
