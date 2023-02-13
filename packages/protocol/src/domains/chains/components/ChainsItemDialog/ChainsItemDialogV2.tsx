import { ChainsItemDialogBase } from './ChainsItemDialogBase';
import { chainDialogContentV2 } from './ChainDialogUtils';
import { IChainsItemDialogProps } from './ChainsItemDialog';

export const ChainsItemDialogV2 = (props: IChainsItemDialogProps) => {
  return (
    <ChainsItemDialogBase content={chainDialogContentV2} isV2 {...props} />
  );
};
