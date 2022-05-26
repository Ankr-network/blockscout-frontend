import type { AxiosInstance } from 'axios';

import {
  IGenerateThresholdKeyRequest,
  IGetThresholdKeyData,
  IIssueJwtTokenRequest,
  IJwtTokenRequest,
  INotarizeTransactionRequest,
  IThresholdKeysFilter,
  JwtTokens,
  NotarizedTransactions,
  Players,
  Proposals,
  ThresholdKeys,
} from './types';
import {
  IJwtToken,
  INotarizedTransaction,
  IThresholdKey,
  UUID,
  Web3Address,
} from '../common';

export interface IApiGateway {
  privateApi: AxiosInstance;
  publicApi: AxiosInstance;

  generateThresholdKey(
    request: IGenerateThresholdKeyRequest,
  ): Promise<IThresholdKey>;

  getJwtTokenById(id: UUID): Promise<IJwtToken>;

  getJwtTokens(
    address: Web3Address,
    offset?: number,
    limit?: number,
  ): Promise<JwtTokens>;

  getNotarizedTransactions(
    offset: number,
    limit: number,
  ): Promise<NotarizedTransactions>;

  getPlayers(offset: number, limit: number): Promise<Players>;

  getProposals(offset: number, limit: number): Promise<Proposals>;

  getThresholdKeyById(id: UUID): Promise<IGetThresholdKeyData>;

  getThresholdKeys(
    offset: number,
    limit: number,
    filter: IThresholdKeysFilter,
  ): Promise<ThresholdKeys>;

  issueJwtToken(request: IIssueJwtTokenRequest): Promise<IJwtToken>;

  notarizeTransaction(
    request: INotarizeTransactionRequest,
  ): Promise<INotarizedTransaction>;

  requestJwtToken(request: IJwtTokenRequest): Promise<IJwtToken>;
}
