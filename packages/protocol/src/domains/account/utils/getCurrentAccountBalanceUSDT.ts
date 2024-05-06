import { MultiRpcWeb3Sdk, Web3Address } from 'multirpc-sdk';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetCurrentAccountBalanceParams {
  web3Service: MultiRpcWeb3Sdk;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const getCurrentAccountBalanceUSDT = async ({
  web3Service,
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
}: IGetCurrentAccountBalanceParams) => {
  const contractService = web3Service.getUsdtContractService({
    depositContractAddress,
    tokenAddress,
  });

  const balance = await contractService.getCurrentAccountBalance();

  return formatBalanceByDecimals(balance, tokenDecimals);
};
