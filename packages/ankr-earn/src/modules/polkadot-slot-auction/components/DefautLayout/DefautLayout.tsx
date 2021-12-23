import { Theme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useQuery } from '@redux-requests/react';
import { ResponseData } from 'modules/common/types/ResponseData';
import { getTheme } from 'modules/common/utils/getTheme';
import { t } from 'modules/i18n/utils/intl';
import { Footer } from 'modules/layout/components/Footer';
import { Header } from 'modules/layout/components/Header';
import { ILayoutProps, Layout } from 'modules/layout/components/Layout';
import { MainNavigation } from 'modules/layout/components/MainNavigation';
import { MainNavigationMobile } from 'modules/layout/components/MainNavigationMobile';
import React, { ReactNode, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { DIALOG_POLKADOT_EXTENSION } from 'store/dialogs/actions';
import { useDialog } from 'store/dialogs/selectors';
import { Themes } from 'ui';
import { Button } from 'uiKit/Button';
import { QueryLoading } from 'uiKit/QueryLoading';
import { connect } from '../../actions/connect';
import { fetchPolkadotAccounts } from '../../actions/fetchPolkadotAccounts';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { WalletSwitcher } from '../../layout/components/WalletSwitcher/WalletSwitcher';
import { initConnect } from '../../sagas/polkadotSlotAuctionSaga';
import { ProviderName } from '../../utils/isProviderAvailable';
import { SelectWalletModal } from '../SelectWalletModal';
import { useDefaultLayoutStyles } from './useDefaultLayoutStyles';

interface IDialog {
  isCloverWalletAvailable: boolean;
  isPolkadotWalletAvailable: boolean;
}

export interface IDefaultLayout
  extends Omit<ILayoutProps, 'headerSlot' | 'footerSlot'> {
  children?: ReactNode;
  theme?: Themes;
}

export const DefaultLayout = ({
  children,
  theme = Themes.light,
  verticalAlign = 'top',
}: IDefaultLayout) => {
  const classes = useDefaultLayoutStyles();
  const dispatch = useDispatch();

  const currentTheme = useMemo((): Theme => getTheme(theme), [theme]);

  const { isConnected, polkadotAccount } = useSlotAuctionSdk();

  const { context, isOpened, handleClose } = useDialog<IDialog | undefined>(
    DIALOG_POLKADOT_EXTENSION,
  );

  const { loading: connectLoading } = useQuery({
    action: connect,
    type: connect,
  });

  const {
    loading: fetchPolkadotAccountsLoading,
    data: { polkadotAccounts },
  } = useQuery<ResponseData<typeof fetchPolkadotAccounts>>({
    defaultData: { polkadotAccounts: [] },
    type: fetchPolkadotAccounts,
  });

  const isLoading: boolean = connectLoading || fetchPolkadotAccountsLoading;

  const providerName: ProviderName | undefined = polkadotAccounts.find(
    item => item.address === polkadotAccount,
  )?.providerName;

  const handleInitConnect = (): void => {
    dispatch(initConnect());
  };

  const handleConnect = (account?: string) => async (): Promise<void> => {
    await dispatch(connect(account));
  };

  const renderedHeader = (
    <ThemeProvider theme={currentTheme}>
      <Header
        mainNavigationSlot={<MainNavigation />}
        mainNavigationMobileSlot={<MainNavigationMobile />}
        rightComponentSlot={
          isConnected ? (
            <WalletSwitcher
              currentProvider={providerName}
              currentWallet={polkadotAccount}
              onConnect={handleConnect}
              wallets={polkadotAccounts}
            />
          ) : (
            <div className={classes.buttonArea}>
              <Button
                className={classes.button}
                color="primary"
                disabled={isLoading}
                onClick={handleInitConnect}
                variant="text"
              >
                {t('polkadot-slot-auction.button.connect')}

                {isLoading && <QueryLoading size={44} />}
              </Button>
            </div>
          )
        }
      />
    </ThemeProvider>
  );

  const renderedFooter = (
    <ThemeProvider theme={currentTheme}>
      <Footer />
    </ThemeProvider>
  );

  return (
    <Layout
      verticalAlign={verticalAlign}
      headerSlot={renderedHeader}
      footerSlot={renderedFooter}
    >
      <ThemeProvider theme={currentTheme}>
        {children}

        <SelectWalletModal
          handleConnect={handleConnect()}
          isCloverWalletAvailable={context?.isCloverWalletAvailable ?? false}
          isOpened={isOpened}
          isPolkadotWalletAvailable={
            context?.isPolkadotWalletAvailable ?? false
          }
          onClose={handleClose}
        />
      </ThemeProvider>
    </Layout>
  );
};
