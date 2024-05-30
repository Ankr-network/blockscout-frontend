import { MultiRpcWeb3Sdk, Web3Address } from 'multirpc-sdk';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetCurrentAccountBalanceUsdcParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  web3Service: MultiRpcWeb3Sdk;
}

export const getCurrentAccountBalanceUsdc = async ({
  web3Service,
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
}: IGetCurrentAccountBalanceUsdcParams) => {
  const contractService = web3Service.getUsdcContractService({
    depositContractAddress,
    tokenAddress,
  });

  const balance = await contractService.getCurrentAccountBalance();

  return formatBalanceByDecimals(balance, tokenDecimals);
};
