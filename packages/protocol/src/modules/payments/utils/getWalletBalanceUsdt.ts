import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetWalletBalanceUsdtParams {
  address: Web3Address;
  network: EBlockchain;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const getWalletBalanceUsdt = async ({
  address,
  network,
  tokenAddress,
  tokenDecimals,
}: IGetWalletBalanceUsdtParams) => {
  const web3ReadService = await MultiService.getWeb3ReadService();

  const contractService = web3ReadService.getContractServiceUsdt(tokenAddress);

  const balance = await contractService.getBalance(address, network);

  return formatBalanceByDecimals(balance, tokenDecimals);
};
