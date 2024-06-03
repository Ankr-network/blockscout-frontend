import { EBlockchain, MultiRpcWeb3Sdk, Web3Address } from 'multirpc-sdk';

import { formatBalanceByDecimals } from './formatBalanceByDecimals';

export interface IGetWalletBalanceUsdcParams {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  network: EBlockchain;
  tokenDecimals: number;
  web3Service: MultiRpcWeb3Sdk;
}

export const getWalletBalanceUsdc = async ({
  depositContractAddress,
  tokenAddress,
  network,
  tokenDecimals,
  web3Service,
}: IGetWalletBalanceUsdcParams) => {
  const contractService = web3Service.getUsdcContractService({
    depositContractAddress,
    tokenAddress,
  });

  const balance = await contractService.getCurrentAccountBalance(
    network,
    tokenAddress,
  );

  return formatBalanceByDecimals(balance, tokenDecimals);
};
