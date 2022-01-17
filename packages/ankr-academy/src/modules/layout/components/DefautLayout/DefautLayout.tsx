import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from 'ui';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MainNavigation } from '../Header/MainNavigation';
import { MainNavigationMobile } from '../Header/MainNavigationMobile';
import { useDefaultLayoutStyles } from './useDefaultLayoutStyles';

export interface IDefaultLayout {
  children?: ReactNode;
  theme?: Themes;
  verticalAlign?: 'top' | 'center' | 'bottom';
  isFooterDisabled?: boolean;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  verticalAlign = 'top',
  isFooterDisabled,
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
          className={classNames(classes.main, {
            [classes.mainAlignTop]: verticalAlign === 'top',
          })}
        >
          {children}
        </main>
        {!isFooterDisabled && <Footer />}
      </ThemeProvider>
    </div>
  );
};
