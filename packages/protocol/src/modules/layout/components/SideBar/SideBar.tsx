import { AccountStatus } from 'modules/common/components/AccountStatus';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
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
  handleSidebarClose?: () => void;
  hasMenu: boolean;
  isEnterpriseClient: boolean;
  isMobileSideBar?: boolean;
  loading: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  handleSidebarClose,
  hasMenu,
  isEnterpriseClient,
  isMobileSideBar = false,
  loading,
}: SidebarProps) => {
  const { isLoggedIn } = useAuth();
  const bannerHeight = useHeaderBannerHeight();
  const { classes, cx } = useStyles({ isMobileSideBar, bannerHeight });
  const {
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
      {isLoggedIn && (
        <div className={classes.balanceRoot}>
          <BalanceMenuContent
            balanceInRequests={balanceInRequests}
            creditBalance={creditBalance}
            currentChargingModel={currentChargingModel}
            isApiCreditsBalance={isApiCreditsBalance}
            usdBalance={usdBalance}
          />
        </div>
      )}
      <MainNavigation
        chainsRoutes={chainsRoutes}
        handleSidebarClose={handleSidebarClose}
        isEnterpriseClient={isEnterpriseClient}
        isMobileSideBar={isMobileSideBar}
        loading={loading}
        onAnalyticsClick={onAnalyticsClick}
      />
    </aside>
  );
};
