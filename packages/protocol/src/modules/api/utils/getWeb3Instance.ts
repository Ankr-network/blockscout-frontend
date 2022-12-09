import Web3 from 'web3';

import { API_ENV } from 'modules/common/utils/environment';

const { REACT_APP_ETH_RPC } = process.env;

export const getWeb3RpcUrl = () => {
  if (REACT_APP_ETH_RPC) return REACT_APP_ETH_RPC;

  return API_ENV === 'prod'
    ? 'https://rpc.ankr.com/eth'
    : 'https://rpc.ankr.com/eth_goerli';
};

export const getWeb3Instance = () => {
  const rpcUrl = getWeb3RpcUrl();

  return new Web3(rpcUrl);
};
