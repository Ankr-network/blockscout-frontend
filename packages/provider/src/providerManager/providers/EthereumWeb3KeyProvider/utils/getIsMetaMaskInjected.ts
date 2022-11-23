import { getIsEthereum } from './getIsEthereum';
import { Web3KeyReadProvider } from '../../Web3KeyReadProvider';

export const getIsMetaMaskInjected = (): boolean => {
  if (!getIsEthereum(window.ethereum)) {
    return false;
  }

  const { isMetaMask, isOKExWallet } = window.ethereum;

  return Web3KeyReadProvider.isInjected() && !!isMetaMask && !isOKExWallet;
};
