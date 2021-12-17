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
  verticalAlign?: 'top' | 'center' | 'bottom';
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  verticalAlign = 'top',
}: IDefaultLayout) => {
  const classes = useDefaultLayoutStyles();
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={currentTheme}>
        <Header
          mainNavigationSlot={<MainNavigation />}
          mainNavigationMobileSlot={<MainNavigationMobile />}
        />
        <main
          className={classNames({
            [classes.mainAlignTop]: verticalAlign === 'top',
          })}
        >
          {children}
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
};
