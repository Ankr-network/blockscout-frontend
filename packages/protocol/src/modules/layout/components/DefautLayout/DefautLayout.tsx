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
import { useThemes } from 'uiKit/Theme/hook/useThemes';

export const CONTENT_WIDTH = 1120;

export interface ILayoutProps {
  children?: ReactChild;
  disableGutters?: boolean;
  hasNoReactSnap?: boolean;
  hasError?: boolean;
  hasGradient?: boolean;
  hasPaddingBottom?: boolean;
}

export const DefaultLayout = ({
  children,
  disableGutters = false,
  hasNoReactSnap = false,
  hasError = false,
  hasGradient = false,
  hasPaddingBottom = true,
}: ILayoutProps) => {
  const { isLightTheme } = useThemes();

  const { classes } = useStyles({
    hasGradient: hasGradient || hasError,
    hasPaddingBottom,
    isLightTheme,
  });
  const { hasPremium, loading } = useAuth();
  const chainsRoutes = usePublicChainsRoutes();

  return (
    <div className={classes.root}>
      <SideBar
        className={classes.sidebar}
        loading={loading}
        hasPremium={hasPremium}
        chainsRoutes={chainsRoutes}
      />
      <div className={classes.body}>
        {!hasError && <Header className={classes.header} />}
        <MobileHeader className={classes.mobileHeader} />
        <Container disableGutters={disableGutters} className={classes.main}>
          <Container
            disableGutters={!disableGutters}
            className={classes.mobileBreadcrumbs}
          >
            <Breadcrumbs />
          </Container>
          {hasNoReactSnap ? <NoReactSnap>{children}</NoReactSnap> : children}
        </Container>
      </div>
      <MobileNavigation
        loading={loading}
        hasPremium={hasPremium}
        chainsRoutes={chainsRoutes}
      />
    </div>
  );
};
