import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  Base64,
  IJwtToken,
  INotarizedTransaction,
  IPlayer,
  IProposal,
  IThresholdKey,
  PrefixedHex,
  TCrypto,
  TJwtTokenType,
  TThresholdKeyRole,
  UUID,
  Web3Address,
} from './types';

const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

export class ApiGateway {
  public publicApi: AxiosInstance;

  public privateApi: AxiosInstance;

  constructor(
    private readonly publicConfig: AxiosRequestConfig,
    private readonly privateConfig: AxiosRequestConfig,
  ) {
    this.publicApi = axios.create(
      { ...publicConfig, ...AXIOS_DEFAULT_CONFIG},
    );
    this.privateApi = axios.create(
      { ...privateConfig, ...AXIOS_DEFAULT_CONFIG},
    );
  }

  public async getPlayers(
    offset: number,
    limit: number,
  ): Promise<[IPlayer[], boolean]> {
    const { data } = await this.publicApi.get<{
      players: IPlayer[];
      has_more?: boolean;
    }>('/v1alpha/player', {
      params: { offset, limit },
    });
    return [data.players || [], data.has_more || false];
  }

  public async getProposals(
    offset: number,
    limit: number,
  ): Promise<[IProposal[], boolean]> {
    const { data } = await this.publicApi.get<{
      proposals: IProposal[];
      has_more?: boolean;
    }>('/v1alpha/proposal', {
      params: { offset, limit },
    });
    return [data.proposals || [], data.has_more || false];
  }

  public async getThresholdKeys(
    offset: number,
    limit: number,
    filter: { name?: string } = {},
  ): Promise<[IThresholdKey[], boolean]> {
    const { data } = await this.publicApi.get<{
      threshold_keys: IThresholdKey[];
      has_more?: boolean;
    }>('/v1alpha/threshold_key', {
      params: { offset, limit, ...filter },
    });
    return [data.threshold_keys || [], data.has_more || false];
  }

  public async getThresholdKeyById(id: UUID): Promise<{
    threshold_key: IThresholdKey;
    deposit_addresses?: Record<PrefixedHex, PrefixedHex>;
  }> {
    const { data } = await this.publicApi.get<{
      threshold_key: IThresholdKey;
      deposit_addresses: Record<PrefixedHex, PrefixedHex>;
    }>(`/v1alpha/threshold_key/${id}`);
    return data;
  }

  public async getJwtTokens(
    offset: number,
    limit: number,
  ): Promise<[IJwtToken[], boolean]> {
    const { data } = await this.publicApi.get<{
      jwt_tokens: IJwtToken[];
      has_more?: boolean;
    }>('/v1alpha/jwt_token', {
      params: { offset, limit },
    });
    return [data.jwt_tokens || [], data.has_more || false];
  }

  public async getJwtTokenById(id: UUID): Promise<IJwtToken> {
    const { data } = await this.publicApi.get<IJwtToken>(
      `/v1alpha/jwt_token/${id}`,
    );
    return data;
  }

  async requestJwtToken(request: {
    transaction_hash: PrefixedHex;
    public_key: Base64;
    threshold_key: UUID;
  }): Promise<IJwtToken> {
    const { data } = await this.publicApi.post<{ jwt_token: IJwtToken }>(
      '/v1alpha/jwt_token/request',
      request,
    );
    return data.jwt_token;
  }

  public async getNotarizedTransactions(
    offset: number,
    limit: number,
  ): Promise<[INotarizedTransaction[], boolean]> {
    const { data } = await this.publicApi.get<{
      notarized_transactions: INotarizedTransaction[];
      has_more?: boolean;
    }>('/v1alpha/notarized_transaction', {
      params: { offset, limit },
    });
    return [data.notarized_transactions || [], data.has_more || false];
  }

  public async generateThresholdKey(request: {
    crypto: TCrypto;
    players: UUID[];
    threshold: number;
    roles: TThresholdKeyRole[];
    party: string;
  }): Promise<IThresholdKey> {
    const { data } = await this.privateApi.post(
      '/private/generate_threshold_key',
      request,
    );
    return data.threshold_key;
  }

  public async issueJwtToken(request: {
    jwt_token: PrefixedHex | Web3Address;
    threshold_key: UUID;
    public_key: Base64;
    token_type: TJwtTokenType;
  }): Promise<IJwtToken> {
    const { data } = await this.privateApi.post<{ jwt_token: IJwtToken }>(
      '/private/issue_jwt_token',
      request,
    );
    return data.jwt_token;
  }

  public async notarizeTransaction(request: {
    threshold_key: UUID;
    chain_id: Base64;
    transaction_hash: Base64;
    block_number?: number;
    transaction_index?: number;
  }): Promise<INotarizedTransaction> {
    const { data } = await this.privateApi.post<{
      notarized_transaction: INotarizedTransaction;
    }>('/private/notarize_transaction', request);
    return data.notarized_transaction;
  }
}
