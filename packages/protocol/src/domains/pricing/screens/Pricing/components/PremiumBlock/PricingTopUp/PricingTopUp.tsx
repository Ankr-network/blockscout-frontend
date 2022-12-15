import { TopUp } from 'domains/account/components/TopUp';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PricingHeader } from './PricingHeader';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { TabsManager } from 'uiKit/TabsManager';
import { usePricingTopUpTabs } from './PricingTopUpUtils';
import { useTopUpStyles } from 'domains/account/components/TopUp/TopUpStyles';

export const PricingTopUp = () => {
  const { ankrBalance, isLoading } = useAnkrBalanceOnWallet();
  const { isUserEthAddressType } = useAuth();
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
