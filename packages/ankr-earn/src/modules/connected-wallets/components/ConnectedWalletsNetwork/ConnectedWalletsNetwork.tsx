import { Collapse, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { useConnectedWalletsNetworkStyles as useStyles } from './useConnectedWalletsNetworkStyles';
import { ReactComponent as DisconnectSVG } from '../../assets/disconnect.svg';
import { ReactComponent as CopySVG } from '../../assets/copy.svg';
import { WalletIcon } from '../WalletIcon';
import { getShortStr } from 'modules/common/utils/getShortStr';
import { useState } from 'react';
import { ReactComponent as AngleDownIcon } from '../../../../assets/img/angle-down-icon.svg';
import classNames from 'classnames';
import { IAddresses } from 'modules/connected-wallets/types';
import CopyToClipboard from 'react-copy-to-clipboard';

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
}: IConnectedWalletsNetworkProps) => {
  const classes = useStyles();
  const [addressesOpen, setAddressesOpen] = useState(false);

  const handleHeaderClick = () => {
    if (addresses.length <= 1) return;

    setAddressesOpen(!addressesOpen);
  };

  const addressesHeader = (
    <Button
      className={classNames(classes.instance, classes.instanceOpener)}
      onClick={handleHeaderClick}
      variant="text"
    >
      <div className={classes.instanceLeftSide}>
        <WalletIcon icon={addresses[0].tokenIconSrc} />
        <span className={classes.instanceText}>
          {getShortStr(addresses[0].address)}
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
            {getShortStr(address.address)}
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
        <Button variant="text" className={classes.button}>
          <CopySVG />
          <span className={classes.buttonText}>{t('wallets.copy')}</span>
        </Button>
      </CopyToClipboard>,
    );

  if (disconnect)
    headerButtons.push(
      <Button
        key={`${addresses[0].address}-disconnect`}
        variant="text"
        className={classes.button}
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
        <Collapse in={addressesOpen} timeout="auto" unmountOnExit>
          {addressesList}
        </Collapse>
      </div>
    </div>
  );
};
