import { ThemeProvider } from '@material-ui/styles';
import { featuresConfig, STAKEFI_LINK } from 'modules/common/const';
import { ConnectedWallets } from 'modules/connected-wallets/screens/ConnectedWallets';
import { useMemo } from 'react';
import { Themes } from 'ui';
import { getTheme } from '../../../common/utils/getTheme';
import { Footer } from '../Footer/index';
import { Header } from '../Header/index';
import { ILayoutProps, Layout } from '../Layout';
import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';
import { SwitchBanner } from '../SwitchBanner';

export interface IDefaultLayoutProps
  extends Omit<ILayoutProps, 'headerSlot' | 'footerSlot'> {
  theme?: Themes;
}

export const DefaultLayout = ({
  theme = Themes.light,
  children,
  verticalAlign = 'top',
}: IDefaultLayoutProps) => {
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <Layout
      verticalAlign={verticalAlign}
      headerSlot={
        <ThemeProvider theme={currentTheme}>
          <Header
            bannerSlot={<SwitchBanner link={STAKEFI_LINK} />}
            mainNavigationSlot={<MainNavigation />}
            mainNavigationMobileSlot={<MainNavigationMobile />}
            rightComponentSlot={
              featuresConfig.earlyRelease ? null : <ConnectedWallets />
            }
          />
        </ThemeProvider>
      }
      footerSlot={
        <ThemeProvider theme={currentTheme}>
          <Footer />
        </ThemeProvider>
      }
    >
      {children}
    </Layout>
  );
};
