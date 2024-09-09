import { AccountStatus } from 'modules/common/components/AccountStatus';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useIsXSDown } from 'uiKit/Theme/useTheme';
import { useTrackAnalytics } from 'modules/layout/hooks/useTrackAnalytics';

import { BalanceMenuContent } from '../BalanceMenu';
import { MainNavigation } from '../MainNavigation';
import { useBalanceMenuButton } from '../BalanceMenuButton/useBalanceMenuButton';
import { useStyles } from './SideBarStyles';
import { useHeaderBannerHeight } from '../HeaderBanner/useHeaderBannerHeight';

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
  const bannerHeight = useHeaderBannerHeight();
  const { classes, cx } = useStyles({ isMobileSideBar, bannerHeight });
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
      {isXsDown && !isReactSnap && (
        <AccountStatus className={classes.accountStatus} />
      )}
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
