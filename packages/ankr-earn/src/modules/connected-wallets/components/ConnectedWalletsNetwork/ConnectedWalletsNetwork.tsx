import { ButtonBase, Collapse, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { t } from 'common';
import { WalletIcon } from 'ui';

import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { TAddresses } from 'modules/connected-wallets/types';
import { Button } from 'uiKit/Button';
import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';

import { ReactComponent as AngleDownIcon } from '../../../../assets/img/angle-down-icon.svg';
import { ReactComponent as CopySVG } from '../../../../assets/img/copy.svg';
import { ReactComponent as DisconnectSVG } from '../../assets/disconnect.svg';

import { useConnectedWalletsNetworkStyles as useStyles } from './useConnectedWalletsNetworkStyles';

interface IConnectedWalletsNetworkProps {
  network: string;
  addresses: TAddresses;
  className?: string;
  onAddressUpdate?: (address: string) => void;
  onDisconnect?: () => void;
}

export const ConnectedWalletsNetwork = ({
  network,
  addresses,
  className,
  onAddressUpdate,
  onDisconnect,
}: IConnectedWalletsNetworkProps): JSX.Element | null => {
  const classes = useStyles();
  const [addressesOpen, setAddressesOpen] = useState(false);

  const isManyAddresses = addresses.length > 1;

  const activeAddressData = useMemo(
    () => addresses.find(address => address.isActive),
    [addresses],
  );

  if (typeof activeAddressData === 'undefined') {
    return null;
  }

  const handleHeaderClick = (): void => {
    if (addresses.length <= 1) return;

    setAddressesOpen(!addressesOpen);
  };

  const onSelectItemClick = (address: string) => (): void => {
    if (address === activeAddressData.address) {
      setAddressesOpen(false);

      return;
    }

    if (typeof onAddressUpdate === 'function') {
      onAddressUpdate(address);
    }

    setAddressesOpen(false);
  };

  const addressesHeader = (
    <Button
      className={classNames(
        classes.instance,
        classes.instanceOpener,
        isManyAddresses && classes.instanceOpenerOn,
      )}
      variant="text"
      onClick={handleHeaderClick}
    >
      <div className={classes.instanceLeftSide}>
        <WalletIcon icon={activeAddressData.tokenIconSrc} />

        <span className={classes.instanceText}>
          {getShortTxHash(activeAddressData.address)}
        </span>
      </div>

      {isManyAddresses && (
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
    isManyAddresses &&
    addresses.map(
      (address): JSX.Element => (
        <ButtonBase
          key={address.address}
          className={classNames(classes.instance, classes.instanceInner)}
          component="div"
          onClick={onSelectItemClick(address.address)}
        >
          <div className={classes.instanceLeftSide}>
            <WalletIcon icon={address.tokenIconSrc} />

            <span className={classes.instanceText}>
              {getShortTxHash(address.address)}
            </span>
          </div>

          {address.isActive && <CompleteIcon size={14} />}
        </ButtonBase>
      ),
    );

  const headerButtons = [
    <CopyToClipboard
      key={`${activeAddressData.address}-copy`}
      text={activeAddressData.address}
    >
      <Button className={classes.button} variant="text">
        <CopySVG />

        <span className={classes.buttonText}>{t('wallets.copy')}</span>
      </Button>
    </CopyToClipboard>,
  ];

  if (onDisconnect)
    headerButtons.push(
      <Button
        key={`${activeAddressData.address}-disconnect`}
        className={classes.button}
        variant="text"
        onClick={onDisconnect}
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
