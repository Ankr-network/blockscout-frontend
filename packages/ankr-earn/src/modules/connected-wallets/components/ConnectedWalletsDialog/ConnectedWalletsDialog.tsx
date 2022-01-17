import { Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Dialog } from 'uiKit/Dialog';
import { ConnectedWalletsNetwork } from '../ConnectedWalletsNetwork';
import { useConnectedWalletsDialogStyles as useStyles } from './useConnectedWalletsDialogStyles';
import { ReactComponent as DisconnectSVG } from '../../assets/disconnect.svg';
import { Button } from 'uiKit/Button';
import { IAddresses } from 'modules/connected-wallets/types';
import { useEffect } from 'react';

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
}: IConnectedWalletsDialogProps) => {
  const classes = useStyles();

  const connectedWallets = networks.map(network => (
    <ConnectedWalletsNetwork
      key={network.network}
      network={network.network}
      addresses={network.addresses}
      className={classes.network}
      disconnect={network.disconnect}
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
    <Dialog open={open} onClose={onClose} className={classes.root}>
      <div className={classes.wrapper}>
        <Typography variant="h2" component="h2" className={classes.header}>
          {t('wallets.connected-wallets')}
        </Typography>
        {connectedWallets}
        {disconnectsCount > 1 && (
          <Button
            variant="text"
            className={classes.button}
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
