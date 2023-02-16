import { PremiumChainDialogBase } from './PremiumChainDialogBase';
import { PremiumChainDialogProps } from './types';
import { items } from './const';

export const PremiumChainDialog = (props: PremiumChainDialogProps) => (
  <PremiumChainDialogBase {...props} items={items} />
);
