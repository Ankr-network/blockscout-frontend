import { AccountStatus } from 'modules/common/components/AccountStatus';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useIsXSDown } from 'uiKit/Theme/useTheme';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { useTrackAnalytics } from 'modules/layout/hooks/useTrackAnalytics';

import { BalanceMenuContent } from '../BalanceMenu';
import { MainNavigation } from '../MainNavigation';
import { useBalanceMenuButton } from '../BalanceMenuButton/useBalanceMenuButton';
import { useHeaderBannerHeight } from '../HeaderBanner/useHeaderBannerHeight';
import { useStyles } from './SideBarStyles';

export interface SidebarProps {
  className?: string;
  handleSidebarClose?: () => void;
  hasMenu: boolean;
  isMobileSideBar?: boolean;
}

export const SideBar = ({
  className = '',
  handleSidebarClose,
  hasMenu,
  isMobileSideBar = false,
}: SidebarProps) => {
  const chainsRoutes = usePublicChainsRoutes();
  const { isLoggedIn, loading } = useAuth();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

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
