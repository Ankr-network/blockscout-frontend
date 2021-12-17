import { Box } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import { ResponseData } from 'modules/common/types/ResponseData';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DIALOG_POLKADOT_EXTENSION } from 'store/dialogs/actions';
import { useDialog } from 'store/dialogs/selectors';
import { Button } from 'uiKit/Button';
import { Curtains } from 'uiKit/Curtains';
import { QueryLoading } from 'uiKit/QueryLoading';
import { connect } from '../../../actions/connect';
import { fetchPolkadotAccounts } from '../../../actions/fetchPolkadotAccounts';
import { SelectWalletModal } from '../../../components/SelectWalletModal';
import { useSlotAuctionSdk } from '../../../hooks/useSlotAuctionSdk';
import { initConnect } from '../../../sagas/polkadotSlotAuctionSaga';
import { Logotype } from '../Logotype';
import { NetworkSwitcher } from '../NetworkSwitcher/NetworkSwitcher';
import { WalletSwitcher } from '../WalletSwitcher/WalletSwitcher';
import { useHeaderStyles } from './useHeaderStyles';

export const Header = () => {
  const classes = useHeaderStyles();
  const dispatch = useDispatch();

  const { polkadotAccount, isConnected } = useSlotAuctionSdk();

  const { isOpened, handleClose, context } = useDialog<
    | {
        isCloverWalletAvailable: false;
        isPolkadotWalletAvailable: false;
      }
    | undefined
  >(DIALOG_POLKADOT_EXTENSION);

  const { loading: connectLoading } = useQuery({
    type: connect.toString(),
    action: connect,
  });

  const {
    loading: fetchPolkadotAccountsLoading,
    data: { polkadotAccounts },
  } = useQuery<ResponseData<typeof fetchPolkadotAccounts>>({
    type: fetchPolkadotAccounts,
    defaultData: { polkadotAccounts: [] },
  });

  const providerName = polkadotAccounts.find(
    item => item.address === polkadotAccount,
  )?.providerName;

  const loading = connectLoading || fetchPolkadotAccountsLoading;

  const handleInitConnect = () => {
    dispatch(initConnect());
  };

  const handleConnect = (newAccount?: string) => async () => {
    await dispatch(connect(newAccount));
  };

  return (
    <>
      <header className={classes.component}>
        <Curtains
          classes={{
            root: classNames(classes.inner),
          }}
        >
          <div className={classes.leftContent}>
            <Logotype />
            <NetworkSwitcher />
          </div>
          {isConnected ? (
            <WalletSwitcher
              wallets={polkadotAccounts}
              currentWallet={polkadotAccount}
              currentProvider={providerName}
              onConnect={handleConnect}
            />
          ) : (
            <Box display="flex">
              <Button
                color="primary"
                className={classes.button}
                disabled={loading}
                onClick={handleInitConnect}
              >
                {t('polkadot-slot-auction.button.connect')}
              </Button>
              {loading && <QueryLoading size={40} />}
            </Box>
          )}
        </Curtains>
      </header>

      <SelectWalletModal
        isOpened={isOpened}
        onClose={handleClose}
        isCloverWalletAvailable={context?.isCloverWalletAvailable ?? false}
        isPolkadotWalletAvailable={context?.isPolkadotWalletAvailable ?? false}
        handleConnect={handleConnect()}
      />
    </>
  );
};
