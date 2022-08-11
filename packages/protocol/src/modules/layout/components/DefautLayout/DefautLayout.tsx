import React, { useMemo, ReactChild } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { Container } from '@material-ui/core';

import { getTheme } from 'modules/common/utils/getTheme';
import { Themes } from 'ui';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { usePublicChainsRoutes } from 'domains/chains/hooks/usePublicChainsRoutes';
import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { MobileNavigation } from '../MobileNavigation';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { Breadcrumbs } from '../Breadcrumbs';

export interface ILayoutProps {
  children?: ReactChild;
  theme?: Themes;
  disableGutters?: boolean;
  hasNoReactSnap?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  disableGutters = false,
  hasNoReactSnap = false,
}: ILayoutProps) => {
  const classes = useStyles();
  const { isWalletConnected, credentials, loading } = useAuth();
  const chainsRoutes = usePublicChainsRoutes();

  const hasCredentials = useMemo(() => Boolean(credentials), [credentials]);

  const isDarkTheme = theme === Themes.dark;
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classNames(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        <SideBar
          className={classes.sidebar}
          loading={loading}
          isWalletConnected={isWalletConnected}
          hasCredentials={hasCredentials}
          chainsRoutes={chainsRoutes}
        />
        <div className={classes.body}>
          <Header className={classes.header} />
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
          isWalletConnected={isWalletConnected}
          hasCredentials={hasCredentials}
          chainsRoutes={chainsRoutes}
        />
      </ThemeProvider>
    </div>
  );
};
