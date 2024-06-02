import { MultiRpcWeb3Sdk, Web3Address } from 'multirpc-sdk';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetWalletBalanceUsdtParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  web3Service: MultiRpcWeb3Sdk;
}

export const getWalletBalanceUsdt = async ({
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
  web3Service,
}: IGetWalletBalanceUsdtParams) => {
  const contractService = web3Service.getUsdtContractService({
    depositContractAddress,
    tokenAddress,
  });

  const balance = await contractService.getCurrentAccountBalance();

  return formatBalanceByDecimals(balance, tokenDecimals);
};
