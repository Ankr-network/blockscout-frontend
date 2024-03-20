import { EventData, Contract, Filter } from 'web3-eth-contract';
import { getPastEvents, isMainnet } from '@ankr.com/advanced-api';
import { IWeb3SendResult } from '@ankr.com/provider';
import Web3 from 'web3';


export interface IDepositAnkrToWalletResult {
  allowance?: IWeb3SendResult;
  deposit: IWeb3SendResult;
}

export interface IGetPastEvents {
  web3: Web3;
  contract: Contract;
  eventName: string;
  startBlock: number;
  latestBlockNumber: number;
  rangeStep?: number;
  filter?: Filter;
  apiUrl: string;
}


export const getPastEventsBlockchain = async ({
  web3,
  contract,
  eventName,
  startBlock,
  latestBlockNumber,
  filter,
  apiUrl,
}: IGetPastEvents): Promise<EventData[]> => {
  return getPastEvents({
    fromBlock: startBlock,
    toBlock: latestBlockNumber,
    blockchain: isMainnet ? 'eth' : 'eth_goerli',
    contract,
    web3,
    eventName,
    filter,
    apiUrl,
  });
};
