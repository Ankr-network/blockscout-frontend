import { Ankr, CreditCard } from '@ankr.com/ui';

import { SecondaryTab } from 'modules/common/components/SecondaryTab';
import {
  TopUpTabID,
  useTopUpTabs,
} from 'domains/account/components/TopUp/TopUpUtils';

import { AccountDetailsAnkrTopUpForm } from './AccountDetailsAnkrTopUpForm';
import { useSubmitTrackingHandler } from './hooks/useSubmitTrackingHandler';

export const useAccountDetailsTopUpTabs = (
  canPayOnlyByCard: boolean,
  tabClassName: string,
  usdPriceId?: string,
) => {
  const trackSubmit = useSubmitTrackingHandler();

  const ankrTopupTab = canPayOnlyByCard
    ? undefined
    : {
        id: TopUpTabID.ANKR,
        content: <AccountDetailsAnkrTopUpForm trackSubmit={trackSubmit} />,
        title: (isSelected: boolean) => (
          <SecondaryTab
            className={tabClassName}
            isSelected={isSelected}
            label={TopUpTabID.ANKR}
            startIcon={<Ankr />}
          />
        ),
      };

  return useTopUpTabs({
    ankrTopupTab,
    icon: <CreditCard />,
    initialTabId: TopUpTabID.USD,
    tabClassName,
    trackSubmit,
    usdPriceId,
  });
};
