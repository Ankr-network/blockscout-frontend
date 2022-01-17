import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { getExtraShortStr } from 'modules/common/utils/getExtraShortStr';
import { getShortStr } from 'modules/common/utils/getShortStr';
import { IAddresses } from 'modules/connected-wallets/types';
import { t } from 'modules/i18n/utils/intl';
import { AngleDownIcon } from 'uiKit/Icons/AngleDownIcon';
import { WalletIcon } from '../WalletIcon';
import { useConnectedWalletsButtonStyles as useStyles } from './useConnectedWalletsButtonStyles';

interface IConnectedWalletsButtonProps {
  onClick: () => void;
  networks: Array<{
    network: string;
    addresses: IAddresses;
    disconnect?: () => void;
  }>;
  className?: string;
  connectHandler: () => void;
}

export const ConnectedWalletsButton = ({
  onClick,
  networks,
  className,
  connectHandler,
}: IConnectedWalletsButtonProps) => {
  const classes = useStyles();

  let leftSide;

  if (networks.length === 1) {
    leftSide = (
      <>
        <WalletIcon icon={networks[0].addresses[0].tokenIconSrc} />
        <span className={classes.instanceText}>
          {getShortStr(networks[0].addresses[0].address)}
        </span>
      </>
    );
  } else if (networks.length === 2) {
    leftSide = (
      <>
        <WalletIcon icon={networks[0].addresses[0].tokenIconSrc} />
        <span className={classes.instanceText}>
          {getExtraShortStr(networks[0].addresses[0].address)}
        </span>
        <WalletIcon icon={networks[1].addresses[0].tokenIconSrc} />
        <span className={classes.instanceText}>
          {getExtraShortStr(networks[1].addresses[0].address)}
        </span>
      </>
    );
  } else {
    leftSide = networks.map(network => (
      <WalletIcon icon={network.addresses[0].tokenIconSrc} />
    ));
  }

  return networks.length > 0 ? (
    <Button className={classNames(classes.root, className)} onClick={onClick}>
      {leftSide}
      <AngleDownIcon className={classes.arrowIcon} />
    </Button>
  ) : (
    <Button
      className={classNames(classes.root, classes.connectButton, className)}
      onClick={connectHandler}
    >
      {t('wallets.connect-btn')}
    </Button>
  );
};
