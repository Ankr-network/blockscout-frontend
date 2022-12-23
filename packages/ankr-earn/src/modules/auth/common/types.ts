import {
  AvailableStakingWriteProviders,
  Web3Address,
} from 'modules/common/types';

export type TChainId = number | string | null;

export interface IConnect {
  address: Web3Address;
  isConnected: boolean;
  providerId: AvailableStakingWriteProviders;
  walletId: string;
  walletName: string;
  walletIcon?: string;
}
