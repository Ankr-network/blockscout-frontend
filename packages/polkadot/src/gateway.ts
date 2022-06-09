import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import BigNumber from 'bignumber.js';
import {
  EActionStatuses,
  EClaimStatuses,
  IClaimItem,
  ICrowdloanType,
  IRewardClaim,
  TActionType,
  TCrowdloanStatus,
  TEthereumAddress,
  TNetworkType,
  TPolkadotAddress,
} from './entity';

interface IQueryParams {}

interface IClaimsParams extends IQueryParams {
  address: TPolkadotAddress;
  loanId: number;
  network: TNetworkType;
}

interface IClaimRes {
  claim: IClaimItem;
  tokenAddress: TEthereumAddress;
}

export class ApiGateway {
  private readonly defaultConfig: AxiosRequestConfig;

  private api: AxiosInstance;

  constructor(config: { baseUrl: string; cacheAge: number }) {
    const cache = setupCache({
      maxAge: config.cacheAge,
    });
    this.defaultConfig = {
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      adapter: cache.adapter,
      responseType: 'json',
    };
    this.api = axios.create(this.defaultConfig);
  }

  private getQueryParams<T extends IQueryParams>(params: T): string {
    return Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
  }

  public async depositAddress(request: { network: TNetworkType }): Promise<{
    address: TPolkadotAddress;
  }> {
    const { data } = await this.api.post(
      `/v1alpha/polkadot/depositAddress`,
      request,
    );
    return data;
  }

  public async deposit(request: {
    network: TNetworkType;
    extrinsic: string;
  }): Promise<{
    id: string;
    status: EActionStatuses;
  }> {
    const { data } = await this.api.post(`/v1alpha/polkadot/deposit`, request);
    return data;
  }

  public async getBalance(request: {
    network: TNetworkType;
    address: string;
  }): Promise<{
    total: BigNumber;
    claimable: BigNumber;
  }> {
    const queryParams = Object.entries(request)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    const {
      data: { total, claimable },
    } = await this.api.get(`/v1alpha/polkadot/balance?${queryParams}`);
    return {
      total: new BigNumber(total),
      claimable: new BigNumber(claimable),
    };
  }

  public async getHistory(request: {
    network: TNetworkType;
    address: string;
  }): Promise<
    {
      address: string;
      timestamp: number;
      type: TActionType;
      amount: BigNumber;
      status: EActionStatuses;
      id: string;
    }[]
  > {
    const queryParams = Object.entries(request)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    const { data } = await this.api.get(
      `/v1alpha/polkadot/history?${queryParams}`,
    );
    return data.map(({ address, timestamp, type, amount, status, id }: any) => {
      return {
        address,
        timestamp,
        type,
        amount: new BigNumber(amount),
        status,
        id,
      };
    });
  }

  public async claim(request: {
    address: TPolkadotAddress;
    amount: string;
    ethAddress: TEthereumAddress;
    network: TNetworkType;
    signature: string;
    timestamp: number;
  }): Promise<IClaimRes> {
    const { data } = await this.api.post('/v1alpha/polkadot/claim', request);

    return data;
  }

  public async getCrowdloanById(request: {
    network: TNetworkType;
    loanId: number;
  }): Promise<ICrowdloanType> {
    const {
      data: { crowdloans },
    } = await this.api.get(`/v1alpha/polkadot/crowdloans`, {
      params: request,
    });
    if (crowdloans.length !== 1) {
      throw new Error(
        `Unable to resolve crowdloan by id ${request.loanId} for network ${request.network}`,
      );
    }
    return this.mapCrowdloanData(crowdloans[0]);
  }

  private mapCrowdloanData(d: any): ICrowdloanType {
    const parseBigOrZero = (value: any) => {
      try {
        return new BigNumber(`${value}`, 10);
      } catch (e) {
        return new BigNumber('0');
      }
    };
    const parseNumberOrZero = (value: any) => {
      let result = Number.parseInt(`${value}`, 10);
      if (Number.isNaN(result)) {
        result = 0;
      }
      return result;
    };
    return {
      airdropPool: d.airdropPool,
      airdropRate: parseBigOrZero(d.airdropRate),
      airdropScheme: d.airdropScheme,
      alreadyContributed: parseBigOrZero(d.alreadyContributed),
      bondTokenContract: d.bondTokenContract,
      bondTokenName: d.bondTokenName,
      bondTokenSymbol: d.bondTokenSymbol,
      currentBid: parseBigOrZero(d.currentBid),
      currentRate: parseBigOrZero(d.currentRate),
      endLease: parseNumberOrZero(d.endLease),
      endTime: parseNumberOrZero(d.endTime),
      fallbackRate: parseBigOrZero(d.fallbackRate),
      loanId: parseNumberOrZero(d.loanId),
      parachainUrl: d.parachainUrl,
      projectDescription: d.projectDescription,
      projectLogo: d.projectLogo,
      projectName: d.projectName,
      projectUrl: d.projectUrl,
      rewardPool: d.rewardPool,
      rewardRate: parseBigOrZero(d.rewardRate),
      rewardRateTicker: d.rewardRateTicker,
      rewardScheme: d.rewardScheme,
      rewardTokenContract: d.rewardTokenContract,
      rewardTokenName: d.rewardTokenName,
      rewardTokenSymbol: d.rewardTokenSymbol,
      stakeFiContributed: parseBigOrZero(d.stakeFiContributed),
      startLease: parseNumberOrZero(d.startLease),
      startTime: parseNumberOrZero(d.startTime),
      status: d.status as TCrowdloanStatus,
      totalRaiseTarget: parseBigOrZero(d.totalRaiseTarget),
    };
  }

  public async getCrowdloans(request: {
    network: TNetworkType;
    status?: TCrowdloanStatus;
  }): Promise<ICrowdloanType[]> {
    const {
      data: { crowdloans },
    } = await this.api.get(`/v1alpha/polkadot/crowdloans`, {
      params: request,
    });
    return crowdloans.map(this.mapCrowdloanData);
  }

  public async crowdloanDepositAddress(request: {
    network: TNetworkType;
    loanId: number;
  }): Promise<{
    address: string;
  }> {
    const { data } = await this.api.post(
      `/v1alpha/polkadot/crowdloanDepositAddress`,
      request,
    );
    return data;
  }

  public async getCrowdloanBalances(request: {
    network: TNetworkType;
    address: string;
    loanId?: number; // not supported yet
  }): Promise<{
    balances: {
      total: BigNumber;
      claimable: BigNumber;
      loanId: number;
    }[];
  }> {
    const {
      data: { balances },
    } = await this.api.get(`/v1alpha/polkadot/crowdloanBalance`, {
      params: request,
    });
    return {
      balances: balances.map((b: any) => {
        return {
          total: new BigNumber(b.total),
          claimable: new BigNumber(b.claimable),
          loanId: Number(b.loanId),
        };
      }),
    };
  }

  public async getCrowdloanHistory(request: {
    network: TNetworkType;
    address: string;
    loanId: string;
  }): Promise<
    {
      address: string;
      timestamp: number;
      type: string;
      amount: BigNumber;
      status: string;
      id: string;
    }[]
  > {
    const queryParams = Object.entries(request)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    const { data } = await this.api.get(
      `/v1alpha/polkadot/crowdloanHistory?${queryParams}`,
    );
    return data.map((d: any) => {
      const { address, timestamp, type, amount, status, id } = d;
      return {
        address,
        timestamp,
        type,
        amount: new BigNumber(amount),
        status,
        id,
      };
    });
  }

  public async getAllClaims(params: IClaimsParams): Promise<IClaimItem[]> {
    const queryParams = this.getQueryParams<IClaimsParams>(params);

    const {
      data: { claims },
    } = await this.api.get(`/v1alpha/polkadot/claims?${queryParams}`);

    return claims;
  }

  public async getRewardClaims(params: IClaimsParams): Promise<IRewardClaim[]> {
    const claims = await this.getAllClaims(params);

    return claims.map(ApiGateway.mapRewardClaimResponse);
  }

  public async crowdloanClaim(request: {
    network: TNetworkType;
    address: string;
    ethAddress: string;
    amount: BigNumber;
    timestamp: number;
    signature: string;
    loanId: number;
  }): Promise<{
    claim: {
      address: string;
      status: EClaimStatuses;
      data: {
        network: number;
        claimId: string;
        issueBlock: number;
        claimBeforeBlock: number;
        amount: BigNumber;
        signature: string;
      };
      createdTimestamp: number;
      expiresTimestamp: number;
    };
    tokenAddress: string;
  }> {
    const {
      data: { claim, tokenAddress },
    } = await this.api.post(`/v1alpha/polkadot/crowdloanClaim`, {
      ...request,
      amount: request.amount.toString(10),
    });
    return {
      claim: {
        address: claim.address,
        status: claim.status,
        data: {
          network: claim.data.network,
          claimId: claim.data.claimId,
          issueBlock: claim.data.issueBlock,
          claimBeforeBlock: claim.data.claimBeforeBlock,
          amount: new BigNumber(claim.data.amount),
          signature: claim.data.signature,
        },
        createdTimestamp: claim.createdTimestamp,
        expiresTimestamp: claim.expiresTimestamp,
      },
      tokenAddress,
    };
  }

  private static mapRewardClaimResponse(claim: any): IRewardClaim {
    return {
      claim: {
        address: claim.address,
        status: claim.status,
        data: {
          network: claim.data.network,
          claimId: claim.data.claimId,
          issueBlock: Number(claim.data.issueBlock),
          claimBeforeBlock: Number(claim.data.claimBeforeBlock),
          amount: new BigNumber(claim.data.amount),
          signature: claim.data.signature,
        },
        createdTimestamp: claim.createdTimestamp,
        expiresTimestamp: claim.expiresTimestamp,
      },
      tokenAddress: claim.tokenAddress,
    };
  }
}
