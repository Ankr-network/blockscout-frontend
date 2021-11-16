import React, { useMemo, ReactChild } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { Container } from '@material-ui/core';

import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { MobileNavigation } from '../MobileNavigation';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { Breadcrumbs } from '../Breadcrumbs';

export interface ILayoutProps {
  children?: ReactChild;
  theme?: Themes;
  isLayoutDefaultColor?: boolean;
  withNoReactSnap?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  withNoReactSnap = true,
}: ILayoutProps) => {
  const classes = useStyles();

  const isDarkTheme = theme === Themes.dark;
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classNames(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        <SideBar className={classes.sidebar} />
        <div className={classes.body}>
          <Header className={classes.header} />
          <MobileHeader className={classes.mobileHeader} />
          <Container className={classes.main}>
            <div className={classes.mobileBreadcrumbs}>
              <Breadcrumbs />
            </div>
            {withNoReactSnap ? <NoReactSnap>{children}</NoReactSnap> : children}
          </Container>
        </div>
        <MobileNavigation />
      </ThemeProvider>
    </div>
  );
};
