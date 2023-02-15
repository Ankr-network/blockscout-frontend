import { Ankr, CreditCard } from '@ankr.com/ui';

import { AccountDetailsAnkrTopUpForm } from './AccountDetailsAnkrTopUpForm';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import {
  TopUpTabID,
  useTopUpTabs,
} from 'domains/account/components/TopUp/TopUpUtils';
import { useSubmitTrackingHandler } from './hooks/useSubmitTrackingHandler';

export const useAccountDetailsTopUpTabs = (canPayOnlyByCard: boolean) => {
  const trackSubmit = useSubmitTrackingHandler();

  const ankrTopupTab = canPayOnlyByCard
    ? undefined
    : {
        id: TopUpTabID.ANKR,
        content: <AccountDetailsAnkrTopUpForm trackSubmit={trackSubmit} />,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={TopUpTabID.ANKR}
            startIcon={<Ankr />}
          />
        ),
      };

  return useTopUpTabs({ ankrTopupTab, trackSubmit, icon: <CreditCard /> });
};
