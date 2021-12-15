import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Footer } from '../Footer/index';
import { Header } from '../Header/index';
import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';
import { useDefaultLayoutStyles } from './useDefaultLayoutStyles';

export interface IDefaultLayout {
  children?: ReactNode;
  theme?: Themes;
  isLayoutDefaultColor?: boolean;
  withNoReactSnap?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
}: IDefaultLayout) => {
  const classes = useDefaultLayoutStyles();
  const isDarkTheme = theme === Themes.dark;
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classNames(classes.root, isDarkTheme && classes.darkTheme)}>
      <ThemeProvider theme={currentTheme}>
        <Header
          mainNavigationSlot={<MainNavigation />}
          mainNavigationMobileSlot={<MainNavigationMobile />}
        />
        <main className={classes.main}>{children}</main>
        <Footer />
      </ThemeProvider>
    </div>
  );
};
