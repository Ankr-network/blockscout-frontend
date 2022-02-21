import { ThemeProvider } from '@material-ui/styles';
import { STAKEFI_LINK } from 'modules/common/const';
import {
  sessionServiceInstance,
  SessionServiceKeys,
} from 'modules/common/services';
import { ConnectedWallets } from 'modules/connected-wallets/screens/ConnectedWallets';
import { useCallback, useMemo, useState } from 'react';
import { Themes } from 'ui';
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
  theme = Themes.light,
  children,
  verticalAlign = 'top',
}: IDefaultLayoutProps) => {
  const [canShowBanner, setShowBanner] = useState(
    !sessionServiceInstance.getItem(SessionServiceKeys.HIDE_OLD_UI_POPUP),
  );
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const handleCloseSwitchBanner = useCallback(() => {
    sessionServiceInstance.setItem(SessionServiceKeys.HIDE_OLD_UI_POPUP, true);
    setShowBanner(false);
  }, []);

  return (
    <Layout
      verticalAlign={verticalAlign}
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
            mainNavigationSlot={<MainNavigation />}
            mainNavigationMobileSlot={<MainNavigationMobile />}
            rightComponentSlot={<ConnectedWallets />}
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
