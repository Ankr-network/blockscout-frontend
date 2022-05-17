import { Theme, ThemeProvider } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import React, { ReactNode, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { t } from 'common';
import { Themes } from 'ui';

import { getTheme } from 'modules/common/utils/getTheme';
import { Footer } from 'modules/layout/components/Footer';
import { Header } from 'modules/layout/components/Header';
import { ILayoutProps, Layout } from 'modules/layout/components/Layout';
import { MainNavigation } from 'modules/layout/components/MainNavigation';
import { MainNavigationMobile } from 'modules/layout/components/MainNavigationMobile';
import { DIALOG_POLKADOT_EXTENSION } from 'store/dialogs/actions';
import { useDialog } from 'store/dialogs/selectors';
import { Button } from 'uiKit/Button';
import { QueryLoading } from 'uiKit/QueryLoading';

import { connect } from '../../actions/connect';
import { IFetchPolkadotAccountsDataItem } from '../../actions/fetchPolkadotAccounts';
import { useFetchPolkadotAccounts } from '../../hooks/useFetchPolkadotAccounts';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { initConnect } from '../../sagas/polkadotSlotAuctionSaga';
import { ProviderName } from '../../utils/isProviderAvailable';
import { SelectWalletModal } from '../SelectWalletModal';
import { WalletSwitcher } from '../WalletSwitcher';

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
}: IDefaultLayout): JSX.Element => {
  const classes = useDefaultLayoutStyles();
  const dispatch = useDispatch();

  const currentTheme = useMemo((): Theme => getTheme(theme), [theme]);

  const { isConnected, polkadotAccount } = useSlotAuctionSdk();
  const { isLoading: fetchPolkadotAccountsLoading, polkadotAccounts } =
    useFetchPolkadotAccounts();

  const { context, isOpened, handleClose } = useDialog<IDialog | undefined>(
    DIALOG_POLKADOT_EXTENSION,
  );

  const { loading: connectLoading } = useQuery({
    action: connect,
    type: connect,
  });

  const isLoading: boolean = connectLoading || fetchPolkadotAccountsLoading;

  const providerName: ProviderName | undefined = (
    polkadotAccounts as IFetchPolkadotAccountsDataItem[]
  ).find(item => item.address === polkadotAccount)?.providerName;

  const handleInitConnect = (): void => {
    dispatch(initConnect());
  };

  const handleConnect = (account?: string) => async (): Promise<void> => {
    await dispatch(connect(account));
  };

  const renderedHeader = (
    <ThemeProvider theme={currentTheme}>
      <Header
        mainNavigationMobileSlot={<MainNavigationMobile />}
        mainNavigationSlot={<MainNavigation />}
        rightComponentSlot={
          isConnected ? (
            <WalletSwitcher
              currentProvider={providerName}
              currentWallet={polkadotAccount}
              wallets={polkadotAccounts as IFetchPolkadotAccountsDataItem[]}
              onConnect={handleConnect}
            />
          ) : (
            <div className={classes.buttonArea}>
              <Button
                className={classes.button}
                color="primary"
                disabled={isLoading}
                variant="text"
                onClick={handleInitConnect}
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
      footerSlot={renderedFooter}
      headerSlot={renderedHeader}
      verticalAlign={verticalAlign}
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
