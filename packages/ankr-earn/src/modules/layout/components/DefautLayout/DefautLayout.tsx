import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Footer } from '../Footer/index';
import { Header } from '../Header/index';
import { useStyles } from './useDefaultLayoutStyles';

export interface ILayoutProps {
  children?: ReactNode;
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
        <main>{children}</main>
        <Footer></Footer>
      </ThemeProvider>
    </div>
  );
};
