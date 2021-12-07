import React, { useMemo, ReactChild } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';

import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../../themes/types';
import { useStyles } from './DefaultLayoutStyles';
import { Header } from '../Header/index';
import { Footer } from '../Footer/index';

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
        <Header></Header>
        <Footer></Footer>
      </ThemeProvider>
    </div>
  );
};
