import { Collapse, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { IAddresses } from 'modules/connected-wallets/types';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';

import { ReactComponent as AngleDownIcon } from '../../../../assets/img/angle-down-icon.svg';
import { ReactComponent as CopySVG } from '../../assets/copy.svg';
import { ReactComponent as DisconnectSVG } from '../../assets/disconnect.svg';
import { WalletIcon } from '../WalletIcon';

import { useConnectedWalletsNetworkStyles as useStyles } from './useConnectedWalletsNetworkStyles';

interface IConnectedWalletsNetworkProps {
  network: string;
  addresses: IAddresses;
  disconnect?: () => void;
  className?: string;
}

export const ConnectedWalletsNetwork = ({
  network,
  addresses,
  disconnect,
  className,
}: IConnectedWalletsNetworkProps): JSX.Element => {
  const classes = useStyles();
  const [addressesOpen, setAddressesOpen] = useState(false);

  const handleHeaderClick = () => {
    if (addresses.length <= 1) return;

    setAddressesOpen(!addressesOpen);
  };

  const addressesHeader = (
    <Button
      className={classNames(classes.instance, classes.instanceOpener)}
      variant="text"
      onClick={handleHeaderClick}
    >
      <div className={classes.instanceLeftSide}>
        <WalletIcon icon={addresses[0].tokenIconSrc} />

        <span className={classes.instanceText}>
          {getShortTxHash(addresses[0].address)}
        </span>
      </div>

      {addresses.length > 1 && (
        <AngleDownIcon
          className={
            addressesOpen
              ? classNames(classes.instanceIconRotate, classes.instanceIcon)
              : classes.instanceIcon
          }
        />
      )}
    </Button>
  );

  const addressesList =
    addresses.length > 1 &&
    addresses.map(address => (
      <div key={address.address} className={classes.instance}>
        <div className={classes.instanceLeftSide}>
          <WalletIcon icon={address.tokenIconSrc} />

          <span className={classes.instanceText}>
            {getShortTxHash(address.address)}
          </span>
        </div>
      </div>
    ));

  const headerButtons = [];

  if (addresses.length === 1)
    headerButtons.push(
      <CopyToClipboard
        key={`${addresses[0].address}-copy`}
        text={addresses[0].address}
      >
        <Button className={classes.button} variant="text">
          <CopySVG />

          <span className={classes.buttonText}>{t('wallets.copy')}</span>
        </Button>
      </CopyToClipboard>,
    );

  if (disconnect)
    headerButtons.push(
      <Button
        key={`${addresses[0].address}-disconnect`}
        className={classes.button}
        variant="text"
        onClick={disconnect}
      >
        <DisconnectSVG />

        <span className={classes.buttonText}>{t('wallets.disconnect')}</span>
      </Button>,
    );

  return (
    <div className={className}>
      <div className={classes.header}>
        <Typography className={classes.network} component="h3" variant="h3">
          {network}
        </Typography>

        <div className={classes.buttons}>{headerButtons}</div>
      </div>

      <div className={classes.instances}>
        {addressesHeader}

        <Collapse unmountOnExit in={addressesOpen} timeout="auto">
          {addressesList}
        </Collapse>
      </div>
    </div>
  );
};
