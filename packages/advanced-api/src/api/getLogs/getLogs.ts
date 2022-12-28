import { AxiosResponse } from 'axios';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AnkrAPIGateway } from '../AnkrAPIGateway';
import { configFromEnv } from '../common/config';
import { IFilter, ILog, TBlockchain } from './types';
import { generateEventOptions } from './utils/generateEventOptions';

const { gatewayConfig } = configFromEnv();

interface IGetLogs {
  id: number;
  jsonrpc: string;
  result: {
    logs: ILog[];
  };
}

export interface IGetLogsArgs {
  fromBlock: number;
  toBlock: number;
  blockchain: TBlockchain;
  contract: Contract;
  web3: Web3;
  eventName: string;
  filter?: IFilter;
  apiUrl?: string;
}

export const getLogs = async ({
  fromBlock,
  toBlock,
  blockchain,
  contract,
  web3,
  eventName,
  filter,
  apiUrl = gatewayConfig.ankrApiBaseUrl,
}: IGetLogsArgs): Promise<AxiosResponse<IGetLogs>> => {
  const { topics } = generateEventOptions({
    web3,
    eventName,
    jsonInterface: contract.options.jsonInterface,
    options: {
      fromBlock,
      toBlock,
      filter,
    },
  });

  try {
    const ankrAPIGateway = new AnkrAPIGateway(apiUrl);

    return await ankrAPIGateway.api({
      data: {
        id: 1,
        jsonrpc: '2.0',
        method: 'ankr_getLogs',
        params: {
          fromBlock,
          toBlock,
          blockchain,
          address: [contract.options.address],
          topics,
        },
      },
    });
  } catch (error) {
    const errorMsg =
      typeof error === 'string' ? error : 'Unable to get indexed logs';

    throw new Error(errorMsg);
  }
};
