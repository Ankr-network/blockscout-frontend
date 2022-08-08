import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  AXIOS_DEFAULT_CONFIG,
  IJwtToken,
  INotarizedTransaction,
  IThresholdKey,
  UUID,
  Web3Address,
} from '../common';
import { IConsensusGateway } from './interfaces';
import {
  IGenerateThresholdKeyData,
  IGenerateThresholdKeyRequest,
  IGetJwtTokensData,
  IGetNotarizedTransactionsData,
  IGetPlayersData,
  IGetProposalsData,
  IGetThresholdKeyData,
  IGetThresholdKeysData,
  IIssueJwtTokenData,
  IIssueJwtTokenRequest,
  IJwtTokenRequest,
  INotarizeTransactionData,
  INotarizeTransactionRequest,
  IRequestJwtTokenData,
  IThresholdKeysFilter,
  JwtTokens,
  NotarizedTransactions,
  Players,
  Proposals,
  ThresholdKeys,
} from './types';

export class ConsensusGateway implements IConsensusGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({
      ...config,
      ...AXIOS_DEFAULT_CONFIG,
    });
  }

  public async getPlayers(offset: number, limit: number): Promise<Players> {
    const { data } = await this.api.get<IGetPlayersData>('/v1alpha/player', {
      params: { offset, limit },
    });

    return [data.players || [], data.has_more || false];
  }

  public async getProposals(offset: number, limit: number): Promise<Proposals> {
    const { data } = await this.api.get<IGetProposalsData>(
      '/v1alpha/proposal',
      {
        params: { offset, limit },
      },
    );

    return [data.proposals || [], data.has_more || false];
  }

  public async getThresholdKeys(
    offset: number,
    limit: number,
    filter: IThresholdKeysFilter = {},
  ): Promise<ThresholdKeys> {
    const { data } = await this.api.get<IGetThresholdKeysData>(
      '/v1alpha/threshold_key',
      {
        params: { offset, limit, ...filter },
      },
    );

    return [data.threshold_keys || [], data.has_more || false];
  }

  public async getThresholdKeyById(id: UUID): Promise<IGetThresholdKeyData> {
    const { data } = await this.api.get<IGetThresholdKeyData>(
      `/v1alpha/threshold_key/${id}`,
    );

    return data;
  }

  public async getJwtTokens(
    address?: Web3Address,
    offset?: number,
    limit?: number,
  ): Promise<JwtTokens> {
    const { data } = await this.api.get<IGetJwtTokensData>(
      '/v1alpha/jwt_token',
      {
        params: { owner_address: address, offset, limit },
      },
    );

    return [data.jwt_tokens || [], data.has_more || false];
  }

  public async getJwtTokenById(id: UUID): Promise<IJwtToken> {
    const { data } = await this.api.get<IJwtToken>(`/v1alpha/jwt_token/${id}`);

    return data;
  }

  async requestJwtToken(request: IJwtTokenRequest): Promise<IJwtToken> {
    const { data } = await this.api.post<IRequestJwtTokenData>(
      '/v1alpha/jwt_token/request',
      request,
    );

    return data.jwt_token;
  }

  public async getNotarizedTransactions(
    offset: number,
    limit: number,
  ): Promise<NotarizedTransactions> {
    const { data } = await this.api.get<IGetNotarizedTransactionsData>(
      '/v1alpha/notarized_transaction',
      {
        params: { offset, limit },
      },
    );

    return [data.notarized_transactions || [], data.has_more || false];
  }

  public async generateThresholdKey(
    request: IGenerateThresholdKeyRequest,
  ): Promise<IThresholdKey> {
    const { data } = await this.api.post<IGenerateThresholdKeyData>(
      '/private/generate_threshold_key',
      request,
    );

    return data.threshold_key;
  }

  public async issueJwtToken(
    request: IIssueJwtTokenRequest,
  ): Promise<IJwtToken> {
    const { data } = await this.api.post<IIssueJwtTokenData>(
      '/private/issue_jwt_token',
      request,
    );

    return data.jwt_token;
  }

  public async notarizeTransaction(
    request: INotarizeTransactionRequest,
  ): Promise<INotarizedTransaction> {
    const { data } = await this.api.post<INotarizeTransactionData>(
      '/private/notarize_transaction',
      request,
    );

    return data.notarized_transaction;
  }
}
