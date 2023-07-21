import { TabsManager } from 'uiKit/TabsManager';
import { TopUp } from 'domains/account/components/TopUp';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTopUpStyles } from 'domains/account/components/TopUp/TopUpStyles';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';

import { useAccountDetailsTopUpTabs } from './AccountDetailsTopupUtils';

interface IAccountDetailsTopUpProps {
  className?: string;
}

export const AccountDetailsTopUp = ({
  className,
}: IAccountDetailsTopUpProps) => {
  const { isUserEthAddressType } = useAuth();

  const canPayOnlyByCard = !isUserEthAddressType;

  const { classes } = useTopUpStyles({ canPayOnlyByCard });

  useBundlePaymentPlans();

  const [tabs, selectedTab] = useAccountDetailsTopUpTabs(
    canPayOnlyByCard,
    classes.tab,
  );

  return (
    <TopUp className={className}>
      <TabsManager
        selectedTab={selectedTab}
        tabs={tabs}
        className={classes.tabs}
        allowSingleTab={false}
      />
    </TopUp>
  );
};
