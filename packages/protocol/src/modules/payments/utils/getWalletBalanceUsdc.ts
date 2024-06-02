import { MultiRpcWeb3Sdk, Web3Address } from 'multirpc-sdk';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetWalletBalanceUsdcParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  web3Service: MultiRpcWeb3Sdk;
}

export const getWalletBalanceUsdc = async ({
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
  web3Service,
}: IGetWalletBalanceUsdcParams) => {
  const contractService = web3Service.getUsdcContractService({
    depositContractAddress,
    tokenAddress,
  });

  const balance = await contractService.getCurrentAccountBalance();

  return formatBalanceByDecimals(balance, tokenDecimals);
};
