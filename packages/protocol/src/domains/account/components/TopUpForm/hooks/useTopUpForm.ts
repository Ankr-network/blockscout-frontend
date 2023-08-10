import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';

import { useTopUpTabs } from './useTopUpTabs';

export interface TopUpFormParams {
  handleOpenEmailDialog: () => void;
  hasEmailBound: boolean;
}

export const useTopUpForm = ({
  handleOpenEmailDialog,
  hasEmailBound,
}: TopUpFormParams) => {
  const { isUserEthAddressType } = useAuth();
  const { bundle500 } = useBundlePaymentPlans({ skipFetching: true });
  const usdPriceId = bundle500?.price.id;

  const usdPaymentOnly = !isUserEthAddressType;

  const [tabs, selectedTab] = useTopUpTabs({
    handleOpenEmailDialog,
    hasEmailBound,
    usdPaymentOnly,
    usdPriceId,
  });

  return { selectedTab, tabs, usdPaymentOnly };
};
