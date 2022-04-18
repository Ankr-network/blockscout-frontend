import { Web3Address } from 'modules/common/types';

export interface IBaseWaletData {
  walletType:
    | 'MetaMask'
    | 'Trust Wallet'
    | 'Math Wallet'
    | 'Clover'
    | string
    | undefined;
  walletPublicAddress?: Web3Address;
}
