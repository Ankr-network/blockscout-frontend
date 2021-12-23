import { ThemeProvider } from '@material-ui/styles';
import { useMemo } from 'react';
import { Themes } from 'ui';
import { getTheme } from '../../../common/utils/getTheme';
import { Footer } from '../Footer/index';
import { Header } from '../Header/index';
import { ILayoutProps, Layout } from '../Layout';
import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';

export interface IDefaultLayoutProps
  extends Omit<ILayoutProps, 'headerSlot' | 'footerSlot'> {
  theme?: Themes;
}

export const DefaultLayout = ({
  theme = Themes.light,
  ...restProps
}: IDefaultLayoutProps) => {
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <Layout
      {...restProps}
      headerSlot={
        <ThemeProvider theme={currentTheme}>
          <Header
            mainNavigationSlot={<MainNavigation />}
            mainNavigationMobileSlot={<MainNavigationMobile />}
          />
        </ThemeProvider>
      }
      footerSlot={
        <ThemeProvider theme={currentTheme}>
          <Footer />
        </ThemeProvider>
      }
    />
  );
};
