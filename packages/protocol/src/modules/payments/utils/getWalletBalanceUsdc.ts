import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetWalletBalanceUsdcParams {
  accountAddress: string;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  network: EBlockchain;
  tokenDecimals: number;
}

export const getWalletBalanceUsdc = async ({
  accountAddress,
  network,
  tokenAddress,
  tokenDecimals,
}: IGetWalletBalanceUsdcParams) => {
  const web3ReadService = await MultiService.getWeb3ReadService();

  const contractService = web3ReadService.getContractServiceUsdc(tokenAddress);

  const balance = await contractService.getBalance(accountAddress, network);

  return formatBalanceByDecimals(balance, tokenDecimals);
};
