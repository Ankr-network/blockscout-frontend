import React, { useMemo, ReactChild } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { Container } from '@material-ui/core';

import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from 'ui';
import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { MobileNavigation } from '../MobileNavigation';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { Breadcrumbs } from '../Breadcrumbs';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface ILayoutProps {
  children?: ReactChild;
  theme?: Themes;
  withNoReactSnap?: boolean;
  disableGutters?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  withNoReactSnap = true,
  disableGutters = false,
}: ILayoutProps) => {
  const classes = useStyles();
  const { isWalletConnected, credentials } = useAuth();

  const hasCredentials = useMemo(() => Boolean(credentials), [credentials]);

  const isDarkTheme = theme === Themes.dark;
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classNames(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        <SideBar
          className={classes.sidebar}
          isWalletConnected={isWalletConnected}
          hasCredentials={hasCredentials}
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
            {withNoReactSnap ? <NoReactSnap>{children}</NoReactSnap> : children}
          </Container>
        </div>
        <MobileNavigation
          isWalletConnected={isWalletConnected}
          hasCredentials={hasCredentials}
        />
      </ThemeProvider>
    </div>
  );
};
