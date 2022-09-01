import { ThemeProvider } from '@material-ui/core';
import { useMemo } from 'react';

import { Themes } from 'ui';

import { featuresConfig } from 'modules/common/const';
import { ConnectedWallets } from 'modules/connected-wallets/screens/ConnectedWallets';
import { ProviderNotification } from 'modules/provider/components/ProviderNotification';

import { getTheme } from '../../../common/utils/getTheme';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { ILayoutProps, Layout } from '../Layout';
import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';

export interface IDefaultLayoutProps
  extends Omit<ILayoutProps, 'headerSlot' | 'footerSlot'> {
  theme?: Themes;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  verticalAlign = 'top',
}: IDefaultLayoutProps): JSX.Element => {
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <Layout
      footerSlot={
        <ThemeProvider theme={currentTheme}>
          <Footer />
        </ThemeProvider>
      }
      headerSlot={
        <ThemeProvider theme={currentTheme}>
          <Header
            bannerSlot={
              featuresConfig.providerNotification && <ProviderNotification />
            }
            mainNavigationMobileSlot={<MainNavigationMobile />}
            mainNavigationSlot={<MainNavigation />}
            rightComponentSlot={<ConnectedWallets />}
          />
        </ThemeProvider>
      }
      verticalAlign={verticalAlign}
    >
      {children}
    </Layout>
  );
};
