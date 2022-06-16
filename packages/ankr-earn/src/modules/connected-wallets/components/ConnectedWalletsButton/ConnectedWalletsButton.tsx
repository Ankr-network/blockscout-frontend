import { Button } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';
import { AvailableWriteProviders } from 'provider';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import {
  getShortTxHash,
  getExtraShortStr,
} from 'modules/common/utils/getShortStr';
import { AngleDownIcon } from 'uiKit/Icons/AngleDownIcon';

import { IWalletItem } from '../../hooks/useAuthWallets';
import { IAddress, TAddresses } from '../../types';
import { WalletIcon } from '../WalletIcon';

import { useConnectedWalletsButtonStyles as useStyles } from './useConnectedWalletsButtonStyles';

interface IConnectedWalletsButtonProps {
  className?: string;
  connectHandler: () => void;
  networks: IWalletItem[];
  walletsGroupTypes?: AvailableWriteProviders[];
  onClick: () => void;
}

export const getAddressData = (addresses: TAddresses): IAddress => {
  const data = addresses.find(address => address.isActive);

  return typeof data !== 'undefined' ? data : addresses[0];
};

export const ConnectedWalletsButton = ({
  className,
  connectHandler,
  networks,
  walletsGroupTypes,
  onClick,
}: IConnectedWalletsButtonProps): JSX.Element => {
  const classes = useStyles();

  let leftSide;

  if (networks.length === 1) {
    const currAddress = getAddressData(networks[0].addresses);

    leftSide = (
      <>
        <WalletIcon icon={currAddress.tokenIconSrc} />

        <span className={classes.instanceText}>
          {getShortTxHash(currAddress.address)}
        </span>
      </>
    );
  } else if (networks.length === 2) {
    const [firstAddress, secondAddress] = [
      getAddressData(networks[0].addresses),
      getAddressData(networks[1].addresses),
    ];

    leftSide = (
      <>
        <WalletIcon icon={firstAddress.tokenIconSrc} />

        <span className={classes.instanceText}>
          {getExtraShortStr(firstAddress.address)}
        </span>

        <WalletIcon icon={secondAddress.tokenIconSrc} />

        <span className={classes.instanceText}>
          {getExtraShortStr(secondAddress.address)}
        </span>
      </>
    );
  } else {
    leftSide = networks.map(network => (
      <WalletIcon icon={getAddressData(network.addresses).tokenIconSrc} />
    ));
  }

  return networks.length > 0 ? (
    <div className={classes.root}>
      <Button
        classes={{
          root: classNames(classes.btn, className),
          label: classes.btnLabel,
        }}
        onClick={onClick}
      >
        {leftSide}

        <AngleDownIcon className={classes.arrowIcon} />
      </Button>

      {walletsGroupTypes?.length ? (
        <PlusMinusBtn
          className={classes.addWalletButton}
          icon="plus"
          tooltip={t('wallets.add-btn-tooltip')}
          onClick={connectHandler}
        />
      ) : null}
    </div>
  ) : (
    <Button
      className={classNames(classes.btn, classes.connectButton, className)}
      onClick={connectHandler}
    >
      {t('wallets.connect-btn')}
    </Button>
  );
};
