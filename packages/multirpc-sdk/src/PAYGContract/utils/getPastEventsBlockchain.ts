import { EventData, Contract, Filter } from 'web3-eth-contract';
import { getPastEvents } from '@ankr.com/advanced-api';
import { IWeb3SendResult } from '@ankr.com/provider';
import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';
import Web3 from 'web3';


export interface IDepositAnkrToWalletResult {
  allowance?: IWeb3SendResult;
  deposit: IWeb3SendResult;
}

export interface IGetPastEvents {
  web3: Web3;
  blockchain: TBlockchain;
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
  blockchain,
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
    blockchain,
    contract,
    web3,
    eventName,
    filter,
    apiUrl,
  });
};
