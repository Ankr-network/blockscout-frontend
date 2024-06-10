import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetWalletBalanceUsdcParams {
  address: Web3Address;
  network: EBlockchain;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const getWalletBalanceUsdc = async ({
  address,
  network,
  tokenAddress,
  tokenDecimals,
}: IGetWalletBalanceUsdcParams) => {
  const web3ReadService = await MultiService.getWeb3ReadService();

  const contractService = web3ReadService.getContractServiceUsdc(tokenAddress);

  const balance = await contractService.getBalance(address, network);

  return formatBalanceByDecimals(balance, tokenDecimals);
};
