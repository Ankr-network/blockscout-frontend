import Web3 from 'web3';
import { EBlockchain } from 'multirpc-sdk';

import { API_ENV } from 'modules/common/utils/environment';
import { getRpcUrlByNetwork } from 'domains/account/utils/getRpcUrlByNetwork';

export const getWeb3EthRpcUrl = () => {
  return API_ENV === 'prod'
    ? 'https://rpc.ankr.com/eth'
    : 'https://rpc.ankr.com/eth_holesky';
};

export const getWeb3Instance = (network = EBlockchain.eth) => {
  const rpcUrl = getRpcUrlByNetwork(network);

  return new Web3(rpcUrl);
};
