import { ReactChild } from 'react';
import { Container } from '@mui/material';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { MobileNavigation } from '../MobileNavigation';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { Breadcrumbs } from '../Breadcrumbs';
import { ConnectWalletDialog } from '../ConnectWalletDialog';
import { StatusTransitionDialog } from '../StatusTransitionDialog';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { useTransitionToFreeWatcher } from 'domains/auth/hooks/useTransitionToFreeWatcher';

export const CONTENT_WIDTH = 1120;

export interface ILayoutProps {
  children?: ReactChild;
  disableGutters?: boolean;
  hasNoReactSnap?: boolean;
  hasError?: boolean;
  hasGradient?: boolean;
  hasPaddingBottom?: boolean;
  isChainItemPage?: boolean;
}

export const DefaultLayout = ({
  children,
  disableGutters = false,
  hasNoReactSnap = false,
  hasError = false,
  hasGradient = false,
  hasPaddingBottom = true,
  isChainItemPage,
}: ILayoutProps) => {
  const { isLightTheme } = useThemes();

  const { classes } = useStyles({
    hasGradient: hasGradient || hasError,
    hasPaddingBottom,
    isLightTheme,
  });
  const { isLoggedIn, loading } = useAuth();
  const chainsRoutes = usePublicChainsRoutes();

  useTransitionToFreeWatcher();

  return (
    <div className={classes.root}>
      <SideBar
        chainsRoutes={chainsRoutes}
        className={classes.sidebar}
        isLoggedIn={isLoggedIn}
        loading={loading}
      />
      <div className={classes.body}>
        {!hasError && (
          <Header
            className={classes.header}
            isChainItemPage={isChainItemPage}
          />
        )}
        <MobileHeader className={classes.mobileHeader} />
        <Container disableGutters={disableGutters} className={classes.main}>
          <div className={classes.mobileBreadcrumbs}>
            <Breadcrumbs />
          </div>
          {hasNoReactSnap ? <NoReactSnap>{children}</NoReactSnap> : children}
        </Container>
        <ConnectWalletDialog />
        <StatusTransitionDialog />
      </div>
      <MobileNavigation
        chainsRoutes={chainsRoutes}
        isLoggedIn={isLoggedIn}
        loading={loading}
      />
    </div>
  );
};
