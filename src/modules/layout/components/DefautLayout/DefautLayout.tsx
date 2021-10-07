import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useMemo, ReactChild } from 'react';
import { Container } from '@material-ui/core';

import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Header } from '../Header';
import { SideBar } from '../SideBar';
import { useStyles } from './DefaultLayoutStyles';

export interface ILayoutProps {
  children?: ReactChild;
  theme?: Themes;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
}: ILayoutProps) => {
  const classes = useStyles();

  const isDarkTheme = theme === Themes.dark;

  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classNames(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        <SideBar />
        <div className={classes.body}>
          <Header />
          <Container className={classes.main} maxWidth={false}>
            <main>{children}</main>
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
};
