import { ThemeProvider } from '@material-ui/core';
import { useMemo } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { Themes } from 'ui';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ConnectedWallets } from 'modules/connected-wallets/screens/ConnectedWallets';
import { ProviderNotification } from 'modules/provider/screens/ProviderNotification';
import { TContainerSize } from 'uiKit/Container';

import { getTheme } from '../../../common/utils/getTheme';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { ILayoutProps, Layout } from '../Layout';
import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';

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
  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

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
              address ? (
                <ProviderNotification
                  containerSize={bannerSize}
                  userAddress={address}
                />
              ) : null
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
