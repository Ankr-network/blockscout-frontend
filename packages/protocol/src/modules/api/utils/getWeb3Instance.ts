import Web3 from 'web3';

import { API_ENV } from 'modules/common/utils/environment';

export const getWeb3RpcUrl = () => {
  return API_ENV === 'prod'
    ? 'https://rpc.ankr.com/eth'
    : 'https://rpc.ankr.com/eth_goerli';
};

export const getWeb3Instance = () => {
  const rpcUrl = getWeb3RpcUrl();

  return new Web3(rpcUrl);
};
