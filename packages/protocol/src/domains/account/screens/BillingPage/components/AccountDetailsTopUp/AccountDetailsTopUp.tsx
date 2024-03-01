import { TabsManager } from 'uiKit/TabsManager';
import { TopUp } from 'domains/account/components/TopUp';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';
import { useTopUpStyles } from 'domains/account/components/TopUp/TopUpStyles';

import { useAccountDetailsTopUpTabs } from './AccountDetailsTopupUtils';

interface IAccountDetailsTopUpProps {
  className?: string;
  hasHeader?: boolean;
}

export const AccountDetailsTopUp = ({
  className,
  hasHeader,
}: IAccountDetailsTopUpProps) => {
  const { isUserEthAddressType } = useAuth();
  const { bundle500 } = useBundlePaymentPlans({ skipFetching: true });
  const usdPriceId = bundle500?.price.id;

  const canPayOnlyByCard = !isUserEthAddressType;

  const { classes } = useTopUpStyles({ canPayOnlyByCard });

  const [tabs, selectedTab] = useAccountDetailsTopUpTabs(
    canPayOnlyByCard,
    classes.tab,
    usdPriceId,
  );

  return (
    <TopUp className={className} hasHeader={hasHeader}>
      <TabsManager
        selectedTab={selectedTab}
        tabs={tabs}
        className={classes.tabs}
        allowSingleTab={false}
      />
    </TopUp>
  );
};
