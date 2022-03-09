import { Typography } from '@material-ui/core';
import { useEffect } from 'react';

import { IAddresses } from 'modules/connected-wallets/types';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';

import { ReactComponent as DisconnectSVG } from '../../assets/disconnect.svg';
import { ConnectedWalletsNetwork } from '../ConnectedWalletsNetwork';

import { useConnectedWalletsDialogStyles as useStyles } from './useConnectedWalletsDialogStyles';

interface IConnectedWalletsDialogProps {
  open: boolean;
  onClose: () => void;
  networks: Array<{
    network: string;
    addresses: IAddresses;
    disconnect?: () => void;
  }>;
}

export const ConnectedWalletsDialog = ({
  open,
  onClose,
  networks,
}: IConnectedWalletsDialogProps): JSX.Element => {
  const classes = useStyles();

  const connectedWallets = networks.map(network => (
    <ConnectedWalletsNetwork
      key={network.network}
      addresses={network.addresses}
      className={classes.network}
      disconnect={network.disconnect}
      network={network.network}
    />
  ));

  const disconnectsCount = networks.filter(
    network => network.disconnect,
  ).length;

  const disconnectAll = () => {
    networks.forEach(network => network.disconnect && network.disconnect());
  };

  useEffect(() => {
    if (!networks || networks.length === 0) onClose();
  }, [networks, onClose]);

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <div className={classes.wrapper}>
        <Typography className={classes.header} component="h2" variant="h2">
          {t('wallets.connected-wallets')}
        </Typography>

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
