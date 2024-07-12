import { useTrackAnalytics } from 'modules/layout/hooks/useTrackAnalytics';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';
import { AccountStatus } from 'modules/common/components/AccountStatus';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { useStyles } from './SideBarStyles';
import { MainNavigation } from '../MainNavigation';
import { BalanceMenuContent } from '../BalanceMenu';
import { useBalanceMenuButton } from '../BalanceMenuButton/useBalanceMenuButton';

export interface SidebarProps {
  chainsRoutes: string[];
  className?: string;
  hasMenu: boolean;
  isEnterpriseClient: boolean;
  isMobileSideBar?: boolean;
  loading: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  hasMenu,
  isEnterpriseClient,
  isMobileSideBar = false,
  loading,
}: SidebarProps) => {
  const { classes, cx } = useStyles(isMobileSideBar);
  const {
    balance,
    balanceInRequests,
    creditBalance,
    currentChargingModel,
    isApiCreditsBalance,
    usdBalance,
  } = useBalanceMenuButton();

  const onAnalyticsClick = useTrackAnalytics();
  const isXsDown = useIsXSDown();

  return (
    <aside className={cx(classes.root, className)}>
      {hasMenu && <GlobalMenuWrapper />}
      {isXsDown && <AccountStatus className={classes.accountStatus} />}
      <div className={classes.balanceRoot}>
        <BalanceMenuContent
          currentChargingModel={currentChargingModel}
          balance={balance}
          creditBalance={creditBalance}
          usdBalance={usdBalance}
          balanceInRequests={balanceInRequests}
          isApiCreditsBalance={isApiCreditsBalance}
        />
      </div>
      <MainNavigation
        chainsRoutes={chainsRoutes}
        isMobileSideBar={isMobileSideBar}
        isEnterpriseClient={isEnterpriseClient}
        loading={loading}
        onAnalyticsClick={onAnalyticsClick}
      />
    </aside>
  );
};
