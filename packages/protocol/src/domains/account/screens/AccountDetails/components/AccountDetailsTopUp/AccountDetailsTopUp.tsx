import { TabsManager } from 'uiKit/TabsManager';
import { TopUp } from 'domains/account/components/TopUp';
import { useAccountDetailsTopUpTabs } from './AccountDetailsTopupUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTopUpStyles } from 'domains/account/components/TopUp/TopUpStyles';

interface IAccountDetailsTopUpProps {
  className?: string;
}

export const AccountDetailsTopUp = ({
  className,
}: IAccountDetailsTopUpProps) => {
  const { isUserEthAddressType } = useAuth();

  const canPayOnlyByCard = !isUserEthAddressType;

  const [tabs, selectedTab] = useAccountDetailsTopUpTabs(canPayOnlyByCard);
  const { classes } = useTopUpStyles({ canPayOnlyByCard });

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
