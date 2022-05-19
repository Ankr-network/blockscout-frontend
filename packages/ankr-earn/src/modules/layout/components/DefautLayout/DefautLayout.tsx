import { ThemeProvider } from '@material-ui/core';
import { useMemo, useCallback, useState } from 'react';

import { Themes } from 'ui';

import { featuresConfig, STAKEFI_LINK } from 'modules/common/const';
import {
  sessionServiceInstance,
  SessionServiceKeys,
} from 'modules/common/services';
import { ConnectedWallets } from 'modules/connected-wallets/screens/ConnectedWallets';

import { getTheme } from '../../../common/utils/getTheme';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { ILayoutProps, Layout } from '../Layout';
import { MainNavigation } from '../MainNavigation';
import { MainNavigationMobile } from '../MainNavigationMobile';
import { SwitchBanner } from '../SwitchBanner';

export interface IDefaultLayoutProps
  extends Omit<ILayoutProps, 'headerSlot' | 'footerSlot'> {
  theme?: Themes;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  verticalAlign = 'top',
}: IDefaultLayoutProps): JSX.Element => {
  const [canShowBanner, setShowBanner] = useState(
    featuresConfig.showOldBanner
      ? !sessionServiceInstance.getItem(SessionServiceKeys.HIDE_OLD_UI_POPUP)
      : false,
  );
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const handleCloseSwitchBanner = useCallback(() => {
    sessionServiceInstance.setItem(SessionServiceKeys.HIDE_OLD_UI_POPUP, true);
    setShowBanner(false);
  }, []);

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
              canShowBanner ? (
                <SwitchBanner
                  link={STAKEFI_LINK}
                  onClose={handleCloseSwitchBanner}
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
