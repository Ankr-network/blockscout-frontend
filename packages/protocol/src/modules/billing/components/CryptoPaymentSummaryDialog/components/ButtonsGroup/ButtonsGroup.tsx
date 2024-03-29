import { Web3Address } from 'multirpc-sdk';

import {
  ConnectedWalletButtons,
  IConnectedWalletButtonsProps,
} from '../ConnectedWalletButtons';
import {
  INoConnectedWalletButtonProps,
  NoConnectedWalletButtons,
} from '../NoConnectedWalletButtons';
import { WalletDetails } from './components/WalletDetails';
import { useButtonsGroupStyles } from './useButtonsGroupStyles';

export interface IButtonsGroupProps
  extends IConnectedWalletButtonsProps,
    INoConnectedWalletButtonProps {
  connectedAddress?: Web3Address;
  walletIcon?: string;
}

export const ButtonsGroup = ({
  connectedAddress,
  isConnecting,
  onAnotherAddressButtonClick,
  onCancelButtonClick,
  onConfirmButtonClick,
  onConnectButtonClick,
  walletIcon,
}: IButtonsGroupProps) => {
  const { classes } = useButtonsGroupStyles();

  if (connectedAddress) {
    return (
      <div className={classes.buttonsGroupRoot}>
        <WalletDetails
          connectedAddress={connectedAddress}
          walletIcon={walletIcon}
        />
        <ConnectedWalletButtons
          onAnotherAddressButtonClick={onAnotherAddressButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onConfirmButtonClick={onConfirmButtonClick}
        />
      </div>
    );
  }

  return (
    <NoConnectedWalletButtons
      isConnecting={isConnecting}
      onCancelButtonClick={onCancelButtonClick}
      onConnectButtonClick={onConnectButtonClick}
    />
  );
};
