import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useMemo, ReactChild } from 'react';
import { Container } from '@material-ui/core';

import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Header } from '../Header';
import { MobileHeader } from '../MobileHeader';
import { MobileNavigation } from '../MobileNavigation';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';
import { useIsMDUp } from 'modules/themes/useTheme';

export interface ILayoutProps {
  children?: ReactChild;
  theme?: Themes;
  isLayoutDefaultColor?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  isLayoutDefaultColor = false,
}: ILayoutProps) => {
  const isDesktop = useIsMDUp();

  const classes = useStyles({ isDesktop, isLayoutDefaultColor });

  const isDarkTheme = theme === Themes.dark;
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classNames(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        {isDesktop && <SideBar />}
        <div className={classes.body}>
          {isDesktop ? <Header /> : <MobileHeader />}
          <Container className={classes.main} maxWidth={false}>
            <>{children}</>
          </Container>
        </div>
        {!isDesktop && <MobileNavigation />}
      </ThemeProvider>
    </div>
  );
};
