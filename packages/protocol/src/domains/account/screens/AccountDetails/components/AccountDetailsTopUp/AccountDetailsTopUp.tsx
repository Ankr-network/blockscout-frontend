import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { TopUp } from 'domains/account/components/TopUp';
import { useAccountDetailsTopUpTabs } from './AccountDetailsTopupUtils';
import { TabsManager } from 'uiKit/TabsManager';

import { useTopUpStyles } from 'domains/account/components/TopUp/TopUpStyles';

interface IAccountDetailsTopUpProps {
  className?: string;
}

export const AccountDetailsTopUp = ({
  className,
}: IAccountDetailsTopUpProps) => {
  const { isUserEthAddressType } = useAccountAuth();

  const canPayOnlyByCard = !isUserEthAddressType;

  const [tabs, selectedTab] = useAccountDetailsTopUpTabs(canPayOnlyByCard);
  const classes = useTopUpStyles({ canPayOnlyByCard });

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
