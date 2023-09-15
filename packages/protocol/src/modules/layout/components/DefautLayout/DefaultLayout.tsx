import { ReactChild } from 'react';
import { Container } from '@mui/material';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { TwoFADialog } from 'domains/userSettings/components/TwoFADialog';
import { NegativeBalanceTermsOfServicesDialog } from 'domains/userSettings/screens/Settings/components/GeneralSettings/components/NegativeBalanceTermsOfServicesDialog';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { Breadcrumbs } from '../Breadcrumbs';
import { StatusTransitionDialog } from '../StatusTransitionDialog';
import { ConnectWalletDialog } from '../ConnectWalletDialog';
import { useConnectWaletDialog } from '../ConnectWalletDialog/hooks/useConnectWalletDialog';

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
  hasNoReactSnap = false,
  hasError = false,
  hasGradient = false,
  isChainItemPage,
  isDashboardPage = false,
}: ILayoutProps) => {
  const { isLightTheme } = useThemes();

  const { classes, cx } = useStyles({
    hasGradient: hasGradient || hasError,
    isLightTheme,
  });
  const { isLoggedIn, loading } = useAuth();
  const { isEnterpriseClient } = useEnterpriseClientStatus();
  const chainsRoutes = usePublicChainsRoutes();
  const { isWeb3UserWithEmailBound } = useConnectWaletDialog();

  return (
    <div className={classes.root}>
      <SideBar
        chainsRoutes={chainsRoutes}
        className={classes.sidebar}
        isLoggedIn={isLoggedIn}
        isEnterpriseClient={isEnterpriseClient}
        loading={loading}
        hasLogo
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
          isLoggedIn={isLoggedIn}
          isEnterpriseClient={isEnterpriseClient}
          loading={loading}
        />
        <Container
          disableGutters={disableGutters}
          className={cx(classes.main, {
            [classes.dashboardMain]: isDashboardPage,
          })}
        >
          <div className={classes.mobileBreadcrumbs}>
            <Breadcrumbs />
          </div>
          {hasNoReactSnap ? <NoReactSnap>{children}</NoReactSnap> : children}
        </Container>
        {isLoggedIn && (
          <GuardUserGroup blockName={BlockWithPermission.Billing}>
            <StatusTransitionDialog />
          </GuardUserGroup>
        )}
        <TwoFADialog />
        <NegativeBalanceTermsOfServicesDialog />
        <ConnectWalletDialog isOpened={isWeb3UserWithEmailBound} />
      </div>
    </div>
  );
};
