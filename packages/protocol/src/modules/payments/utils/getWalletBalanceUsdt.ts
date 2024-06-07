import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetWalletBalanceUsdtParams {
  accountAddress: string;
  network: EBlockchain;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const getWalletBalanceUsdt = async ({
  accountAddress,
  network,
  tokenAddress,
  tokenDecimals,
}: IGetWalletBalanceUsdtParams) => {
  const web3ReadService = await MultiService.getWeb3ReadService();

  const contractService = web3ReadService.getContractServiceUsdt(tokenAddress);

  const balance = await contractService.getBalance(accountAddress, network);

  return formatBalanceByDecimals(balance, tokenDecimals);
};
