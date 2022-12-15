import {
  TopUpTabID,
  useTopUpTabs,
} from 'domains/account/components/TopUp/TopUpUtils';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { PricingAnkrTopUpForm } from './PricingAnkrTopUpForm';

export const usePricingTopUpTabs = (canPayOnlyByCard: boolean) => {
  const ankrTab = canPayOnlyByCard
    ? undefined
    : {
        id: TopUpTabID.ANKR,
        content: <PricingAnkrTopUpForm />,
        title: (isSelected: boolean) => (
          <SecondaryTab isSelected={isSelected} label={TopUpTabID.ANKR} />
        ),
      };

  return useTopUpTabs(ankrTab);
};
