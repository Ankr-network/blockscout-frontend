import { MultiRpcWeb3Sdk } from 'multirpc-sdk';

export interface IGetWalletBalanceAnkrParams {
  web3Service: MultiRpcWeb3Sdk;
}

export const getWalletBalanceAnkr = async ({
  web3Service,
}: IGetWalletBalanceAnkrParams) => {
  const balance = await web3Service
    .getContractService()
    .getCurrentAccountBalance();

  const keyProvider = web3Service.getKeyWriteProvider();

  return keyProvider.getWeb3().utils.fromWei(balance);
};
