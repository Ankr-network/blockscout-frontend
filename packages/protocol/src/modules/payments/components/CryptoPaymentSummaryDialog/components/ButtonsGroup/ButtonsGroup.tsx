import { Web3Address } from 'multirpc-sdk';

import { AccountsChangedAlert } from '../AccountsChangedAlert';
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
  isAccountChangedOnDepositStep: boolean;
}

export const ButtonsGroup = ({
  connectedAddress,
  isAccountChangedOnDepositStep,
  isWalletAccountConnecting,
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
        {isAccountChangedOnDepositStep && <AccountsChangedAlert />}
        <ConnectedWalletButtons
          isAccountChangedOnDepositStep={isAccountChangedOnDepositStep}
          onAnotherAddressButtonClick={onAnotherAddressButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onConfirmButtonClick={onConfirmButtonClick}
        />
      </div>
    );
  }

  return (
    <NoConnectedWalletButtons
      isWalletAccountConnecting={isWalletAccountConnecting}
      onCancelButtonClick={onCancelButtonClick}
      onConnectButtonClick={onConnectButtonClick}
    />
  );
};
