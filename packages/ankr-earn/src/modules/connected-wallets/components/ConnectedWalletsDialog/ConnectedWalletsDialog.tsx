import { Typography } from '@material-ui/core';
import { useEffect } from 'react';

import { AvailableWriteProviders } from 'provider';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';

import { ReactComponent as DisconnectSVG } from '../../assets/disconnect.svg';
import { IWalletItem } from '../../hooks/useAuthWallets';
import { ConnectedWalletsNetwork } from '../ConnectedWalletsNetwork';

import { useConnectedWalletsDialogStyles as useStyles } from './useConnectedWalletsDialogStyles';

interface IConnectedWalletsDialogProps {
  networks: IWalletItem[];
  open: boolean;
  walletsGroupTypes?: AvailableWriteProviders[];
  onAddWallet: () => void;
  onClose: () => void;
}

export const ConnectedWalletsDialog = ({
  networks,
  open,
  walletsGroupTypes,
  onAddWallet,
  onClose,
}: IConnectedWalletsDialogProps): JSX.Element => {
  const classes = useStyles();

  const connectedWallets = networks.map(network => (
    <ConnectedWalletsNetwork
      key={network.network}
      addresses={network.addresses}
      className={classes.network}
      network={network.network}
      onAddressUpdate={network.onAddressUpdate}
      onDisconnect={network.onDisconnect}
    />
  ));

  const disconnectsCount = networks.filter(
    network => network.onDisconnect,
  ).length;

  const disconnectAll = () => {
    networks.forEach(network => network.onDisconnect && network.onDisconnect());
  };

  useEffect(() => {
    if (!networks || networks.length === 0) onClose();
  }, [networks, onClose]);

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <div className={classes.wrapper}>
        <div className={classes.headerArea}>
          <Typography className={classes.header} component="h2" variant="h2">
            {t('wallets.connected-wallets')}
          </Typography>

          {walletsGroupTypes?.length ? (
            <PlusMinusBtn
              className={classes.addWalletButton}
              icon="plus"
              tooltip={t('wallets.add-btn-tooltip')}
              onClick={onAddWallet}
            />
          ) : null}
        </div>

        {connectedWallets}

        {disconnectsCount > 1 && (
          <Button
            className={classes.button}
            variant="text"
            onClick={disconnectAll}
          >
            <DisconnectSVG />

            <span className={classes.buttonText}>
              {t('wallets.disconnect-all')}
            </span>
          </Button>
        )}
      </div>
    </Dialog>
  );
};
