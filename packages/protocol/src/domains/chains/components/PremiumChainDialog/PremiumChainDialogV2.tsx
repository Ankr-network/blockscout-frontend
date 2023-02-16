import { PremiumChainDialogBase } from './PremiumChainDialogBase';
import { PremiumChainDialogProps } from './types';
import { itemsV2 } from './const';

export const PremiumChainDialogV2 = (props: PremiumChainDialogProps) => (
  <PremiumChainDialogBase {...props} isV2 items={itemsV2} />
);
