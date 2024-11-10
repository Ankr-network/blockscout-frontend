import {
  ConnectWalletDialog,
  useConnectWalletDialog,
} from 'modules/layout/components/ConnectWalletDialog';

export const ConnectWalletDialogContainer = () => {
  const { isWeb3UserWithEmailBound } = useConnectWalletDialog();

  return <ConnectWalletDialog isOpened={isWeb3UserWithEmailBound} />;
};
