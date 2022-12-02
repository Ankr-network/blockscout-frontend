import { ThemeProvider } from '@material-ui/core';
import { useMemo } from 'react';

import { Themes } from 'ui';

import { featuresConfig } from 'modules/common/const';
import { ConnectedWallets } from 'modules/connected-wallets/screens/ConnectedWallets';
import { ProviderNotification } from 'modules/provider/components/ProviderNotification';
import { TContainerSize } from 'uiKit/Container';

import { getTheme } from '../../../common/utils/getTheme';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { ILayoutProps, Layout } from '../Layout';
import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';
import { SuspendBanner } from '../SuspendBanner';

export interface IDefaultLayoutProps
  extends Omit<ILayoutProps, 'headerSlot' | 'footerSlot'> {
  theme?: Themes;
  bannerSize?: TContainerSize;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  verticalAlign = 'top',
  bannerSize,
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
            bannerSize={bannerSize}
            bannerSlot={
              <>
                <ProviderNotification />

                {featuresConfig.suspendBanner && <SuspendBanner />}
              </>
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
