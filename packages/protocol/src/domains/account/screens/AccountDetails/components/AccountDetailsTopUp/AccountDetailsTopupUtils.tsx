import {
  TopUpTabID,
  useTopUpTabs,
} from 'domains/account/components/TopUp/TopUpUtils';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { AccountDetailsAnkrTopUpForm } from './AccountDetailsAnkrTopUpForm';

export const useAccountDetailsTopUpTabs = (canPayOnlyByCard: boolean) => {
  const ankrTab = canPayOnlyByCard
    ? undefined
    : {
        id: TopUpTabID.ANKR,
        content: <AccountDetailsAnkrTopUpForm />,
        title: (isSelected: boolean) => (
          <SecondaryTab isSelected={isSelected} label={TopUpTabID.ANKR} />
        ),
      };

  return useTopUpTabs(ankrTab);
};
