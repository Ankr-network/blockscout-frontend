import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IJwtToken, UUID, Web3Address } from './types';
import { v4 } from 'uuid';

export interface INodeEntity {
  id: string;
  blockchain: string;
  scheme: string;
  requestUrl: string;
  websocketUrl?: string;
  weight: number;
  continent: string;
  country: string;
  organization: string;
  city: string;
  features: string[];
  isArchive: boolean;
}

export type TBlockchainFeature = 'rpc' | 'ws';

export interface IBlockchainEntity {
  id: string;
  stats?: {
    reqs: number;
  };
  features: TBlockchainFeature[];
  name: string;
}

export type IWorkerGlobalStatus = {
  uniqueVisitors: number;
  uniqueVisitorsHistory: Record<string, number>;
  totalRequests: number;
  totalRequestsHistory: Record<string, number>;
  totalCached: number;
  totalCachedHistory: Record<string, number>;
  totalServed: number;
  totalServedHistory: Record<string, number>;
  dataCached: number;
  dataCachedHistory: Record<string, number>;
  countries: Record<
    string,
    {
      country: string;
      bytes: number;
      requests: number;
    }
  >;
};

export type IWorkerTotalStats = {
  count: number;
  sum: {
    edgeResponseBytes: number;
    visits: number;
  };
}[];

export type IWorkerNodesWeight = {
  id: string;
  weight: number;
  latency: number;
  timestamp: number;
  height: number;
}[];

type ISO2CountryCode = string;

export type IWorkerUserLocation = {
  id: string;
  name: string;
  continent: string;
  country: ISO2CountryCode;
  city: string;
  timezone: string;
};

const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

export type Timeframe = '24h' | '7d' | '30d';

export class WorkerGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  public addJwtToken(jwtToken: IJwtToken) {
    this.api = axios.create({
      ...this.config,
      ...AXIOS_DEFAULT_CONFIG,
      headers: {
        Authorization: `Bearer ${jwtToken.signed_token}`,
      },
    });
  }

  public removeJwtToken() {
    this.api = axios.create({ ...this.config, ...AXIOS_DEFAULT_CONFIG });
  }

  public async apiGetBlockchains(): Promise<IBlockchainEntity[]> {
    const { data } = await this.api.get<IBlockchainEntity[]>(
      '/api/v1/blockchain',
    );
    return data;
  }

  public async apiGetNodes(blockchain?: string): Promise<INodeEntity[]> {
    const { data } = await this.api.get<INodeEntity[]>('/api/v1/node', {
      params: { blockchain },
    });
    return data;
  }

  public async apiImportJwtToken(jwtToken?: string): Promise<{
    token: string;
    id: UUID;
    address: Web3Address;
    tier: number;
    roles: number[];
  }> {
    const { data } = await this.api.post('/api/v1/jwt', {
      jwtToken,
    });
    return data;
  }

  public async apiGetGlobalStats(
    blockchain?: string,
  ): Promise<IWorkerGlobalStatus> {
    const { data } = await this.api.get<IWorkerGlobalStatus>(
      '/api/v1/stats/global',
      {
        params: { blockchain },
      },
    );
    return data;
  }

  public async apiGetTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus> {
    const { data } = await this.api.get<IWorkerGlobalStatus>(
      `/api/v1/stats/${blockchain}/${timeframe}`,
    );
    return data;
  }

  public async apiGetTotalStats(
    blockchain?: string,
  ): Promise<IWorkerTotalStats> {
    const { data } = await this.api.get<IWorkerTotalStats>(
      '/api/v1/stats/total',
      {
        params: { blockchain },
      },
    );
    return data;
  }

  public async apiGetLegacyStats(
    blockchain?: string,
  ): Promise<IWorkerTotalStats> {
    const { data } = await this.api.get<IWorkerTotalStats>(
      '/api/v1/stats/legacy',
      {
        params: { blockchain },
      },
    );
    return data;
  }

  public async apiNodesWeight(): Promise<IWorkerNodesWeight> {
    const { data } = await this.api.get<IWorkerNodesWeight>('/api/v1/weight');

    return data;
  }

  public async apiGetUserLocation(): Promise<IWorkerUserLocation> {
    const { data } = await this.api.get<IWorkerUserLocation>(
      '/api/v1/datacenter',
    );

    return data;
  }

  public async backofficeGetBlockchains(): Promise<IBlockchainEntity[]> {
    const { data } = await this.api.get<IBlockchainEntity[]>(
      '/backoffice/v1/blockchain',
    );
    return data;
  }

  public async backofficeCreateOrUpdateBlockchain(
    node: IBlockchainEntity,
  ): Promise<Record<string, any>> {
    if (!node.id) node.id = v4();
    const { data } = await this.api.post('/backoffice/v1/blockchain', node);
    return data;
  }

  public async backofficeDeleteBlockchain(
    blockchain: IBlockchainEntity,
  ): Promise<IBlockchainEntity> {
    const { data } = await this.api.delete<IBlockchainEntity>(
      '/backoffice/v1/blockchain',
      {
        params: { id: blockchain.id },
      },
    );
    return data;
  }

  public async backofficeMigrateLegacy(): Promise<any> {
    const { data } = await this.api.post<INodeEntity[]>(
      '/backoffice/v1/legacy',
      {},
    );
    return data;
  }

  public async backofficeGetNodes(blockchain?: string): Promise<INodeEntity[]> {
    const { data } = await this.api.get<INodeEntity[]>('/backoffice/v1/node', {
      params: { blockchain },
    });
    return data;
  }

  public async backofficeCreateOrUpdateNode(
    node: INodeEntity,
  ): Promise<Record<string, any>> {
    if (!node.id) node.id = v4();
    const { data } = await this.api.post('/backoffice/v1/node', node);
    return data;
  }

  public async backofficeDeleteNode(node: INodeEntity): Promise<INodeEntity> {
    const { data } = await this.api.delete<INodeEntity>('/backoffice/v1/node', {
      params: { id: node.id },
    });
    return data;
  }
}
