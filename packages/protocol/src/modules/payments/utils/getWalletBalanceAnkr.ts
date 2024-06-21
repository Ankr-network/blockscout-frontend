import { Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export interface IGetWalletBalanceAnkrParams {
  address: Web3Address;
}

export const getWalletBalanceAnkr = async ({
  address,
}: IGetWalletBalanceAnkrParams) => {
  const web3ReadService = await MultiService.getWeb3ReadService();
  const balance = await web3ReadService
    .getContractService()
    .getBalance(address);

  const provider = web3ReadService.getProvider();

  return provider.getWeb3().utils.fromWei(balance);
};
