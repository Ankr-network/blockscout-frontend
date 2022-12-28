import BigNumber from 'bignumber.js';

import { PricingHeader } from './PricingHeader';
import { TabsManager } from 'uiKit/TabsManager';
import { TopUp } from 'domains/account/components/TopUp';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePricingTopUpTabs } from './PricingTopUpUtils';
import { useTopUpStyles } from 'domains/account/components/TopUp/TopUpStyles';

export const PricingTopUp = () => {
  const { isUserEthAddressType, hasWeb3Connection } = useAuth();

  const { ankrBalance = new BigNumber(0), isLoading } =
    useAnkrBalanceOnWallet(hasWeb3Connection);

  const canPayOnlyByCard = !isUserEthAddressType;

  const classes = useTopUpStyles({ canPayOnlyByCard });

  const [tabs, selectedTab] = usePricingTopUpTabs(canPayOnlyByCard);

  return (
    <TopUp
      header={
        canPayOnlyByCard ? null : (
          <PricingHeader balance={ankrBalance} isLoading={isLoading} />
        )
      }
    >
      <TabsManager
        selectedTab={selectedTab}
        tabs={tabs}
        className={classes.tabs}
        allowSingleTab={false}
      />
    </TopUp>
  );
};
