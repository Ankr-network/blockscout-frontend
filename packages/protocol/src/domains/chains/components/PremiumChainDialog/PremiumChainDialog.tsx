import { PremiumChainDialogBase } from './PremiumChainDialogBase';
import { PremiumChainDialogProps } from './types';
import { items, itemsPremium } from './const';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const PremiumChainDialog = (props: PremiumChainDialogProps) => {
  const { hasPremium } = useAuth();

  return (
    <PremiumChainDialogBase
      {...props}
      items={hasPremium ? itemsPremium : items}
    />
  );
};
