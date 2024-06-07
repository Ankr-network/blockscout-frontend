import { Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export interface IGetWalletBalanceAnkrParams {
  accountAddress: Web3Address;
}

export const getWalletBalanceAnkr = async ({
  accountAddress,
}: IGetWalletBalanceAnkrParams) => {
  const web3ReadService = await MultiService.getWeb3ReadService();
  const balance = await web3ReadService
    .getContractService()
    .getBalance(accountAddress);

  const provider = web3ReadService.getProvider();

  return provider.getWeb3().utils.fromWei(balance);
};
