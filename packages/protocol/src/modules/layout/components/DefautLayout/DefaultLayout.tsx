import { ReactChild } from 'react';
import { Container } from '@mui/material';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { NegativeBalanceTermsOfServicesDialog } from 'domains/userSettings/screens/Settings/components/GeneralSettings/components/NegativeBalanceTermsOfServicesDialog';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { TwoFADialog } from 'domains/userSettings/components/TwoFADialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { SHOULD_SHOW_HEADER_BANNER } from 'modules/layout/const';

import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { Breadcrumbs } from '../Breadcrumbs';
import { StatusTransitionDialog } from '../StatusTransitionDialog';
import { ConnectWalletDialog } from '../ConnectWalletDialog';
import { useConnectWalletDialog } from '../ConnectWalletDialog/hooks/useConnectWalletDialog';
import { HeaderBanner } from '../HeaderBanner';
import { Footer } from '../Footer';
import { useHeaderBannerHeight } from '../HeaderBanner/useHeaderBannerHeight';

export const CONTENT_WIDTH = 1120;

export const CONTAINER_STYLES = {
  maxWidth: CONTENT_WIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
};

export interface ILayoutProps {
  children?: ReactChild;
  disableGutters?: boolean;
  hasNoReactSnap?: boolean;
  hasError?: boolean;
  hasGradient?: boolean;
  isChainItemPage?: boolean;
  isDashboardPage?: boolean;
}

export const DefaultLayout = ({
  children,
  disableGutters = false,
  hasError = false,
  hasGradient = false,
  hasNoReactSnap = false,
  isChainItemPage,
  isDashboardPage = false,
}: ILayoutProps) => {
  const { isLightTheme } = useThemes();

  const bannerHeight = useHeaderBannerHeight();

  const { classes, cx } = useStyles({
    hasGradient: hasGradient || hasError,
    isLightTheme,
    bannerHeight,
  });
  const { isLoggedIn, loading } = useAuth();
  const { isEnterpriseClient } = useEnterpriseClientStatus();
  const chainsRoutes = usePublicChainsRoutes();
  const { isWeb3UserWithEmailBound } = useConnectWalletDialog();

  return (
    <>
      {SHOULD_SHOW_HEADER_BANNER && <HeaderBanner />}
      <div className={classes.root}>
        <SideBar
          chainsRoutes={chainsRoutes}
          className={classes.sidebar}
          hasMenu
          isEnterpriseClient={isEnterpriseClient}
          loading={loading}
        />
        <div className={classes.body}>
          {!hasError && (
            <Header
              className={cx(classes.header, {
                [classes.dashboardHeader]: isDashboardPage,
              })}
              isChainItemPage={isChainItemPage}
            />
          )}
          <MobileHeader
            className={classes.mobileHeader}
            chainsRoutes={chainsRoutes}
            isEnterpriseClient={isEnterpriseClient}
            loading={loading}
          />
          <Container
            disableGutters={disableGutters}
            className={cx(classes.main, {
              [classes.dashboardMain]: isDashboardPage,
            })}
          >
            <div className={classes.content}>
              <div className={classes.mobileBreadcrumbs}>
                <Breadcrumbs />
              </div>
              {hasNoReactSnap ? (
                <NoReactSnap>{children}</NoReactSnap>
              ) : (
                children
              )}
            </div>
          </Container>
          <Footer />
          {isLoggedIn && !isEnterpriseClient && (
            <GuardUserGroup blockName={BlockWithPermission.Billing}>
              <StatusTransitionDialog />
            </GuardUserGroup>
          )}
          <TwoFADialog />
          <NegativeBalanceTermsOfServicesDialog />
          <ConnectWalletDialog isOpened={isWeb3UserWithEmailBound} />
        </div>
      </div>
    </>
  );
};
