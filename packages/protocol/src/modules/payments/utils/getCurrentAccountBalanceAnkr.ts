import { MultiRpcWeb3Sdk } from 'multirpc-sdk';

export interface IGetCurrentAccountBalanceParams {
  web3Service: MultiRpcWeb3Sdk;
}

export const getCurrentAccountBalanceAnkr = async ({
  web3Service,
}: IGetCurrentAccountBalanceParams) => {
  const balance = await web3Service
    .getContractService()
    .getCurrentAccountBalance();

  const keyProvider = web3Service.getKeyWriteProvider();

  return keyProvider.getWeb3().utils.fromWei(balance);
};
