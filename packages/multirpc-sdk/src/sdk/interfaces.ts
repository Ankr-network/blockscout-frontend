import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';
import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';

import { IConsensusGateway } from '../consensus';
import { Base64, IJwtToken, PrefixedHex, UUID, Web3Address } from '../common';
import { IPremiumPlanContractManager } from '../PremiumPlanContract';
import {
  IPrivateEndpoint,
  IProvider,
  IWorkerEndpoint,
  IWorkerGateway,
  RestrictedDomains,
  RestrictedIps,
} from '../worker';
import { IIssueJwtTokenResult, FetchBlockchainUrlsResult } from './types';
import { RpcGateway } from '../rpc/RpcGateway';
import {
  IAggregatedPaymentHistoryRequest,
  IAggregatedPaymentHistoryResponse,
  IBalance,
  IPaymentHistoryRequest,
  IPaymentHistoryResponse,
  PrivateStats,
  PrivateStatsInterval,
} from '../account';
import { IBackofficeGateway, IBlockchainEntity } from '../backoffice';
import { IPAYGContractManager } from '../PAYGContract';
import { IWorkerGlobalStatus, IWorkerNodesWeight, Timeframe } from '../public';

export interface IMultiRpcSdk {
  addPrivateEndpoint(
    jwtToken: IJwtToken,
    endpoint: IPrivateEndpoint,
  ): Promise<IWorkerEndpoint>;

  deletePrivateEndpoint(jwtToken: IJwtToken, endpointId: string): Promise<void>;

  editChainRestrictedDomains(
    jwtToken: IJwtToken,
    chainId: string,
    domains: string[],
  ): Promise<RestrictedDomains>;

  editChainRestrictedIps(
    jwtToken: IJwtToken,
    chainId: string,
    domains: string[],
  ): Promise<RestrictedIps>;

  editPrivateEndpoint(
    jwtToken: IJwtToken,
    endpoint: IPrivateEndpoint,
  ): Promise<IWorkerEndpoint>;

  fetchPrivateEndpoints(jwtToken: IJwtToken): Promise<IWorkerEndpoint>;

  fetchPrivateUrls(jwtToken: IJwtToken): Promise<FetchBlockchainUrlsResult>;

  fetchProvider(jwtToken: IJwtToken): Promise<IProvider>;

  getConsensusGateway(): IConsensusGateway;

  getChainRestrictedDomains(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedDomains>;

  getChainRestrictedIps(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedIps>;

  getPremiumPlanContractManager(): IPremiumPlanContractManager;

  getPAYGContractManager(): IPAYGContractManager;

  getKeyProvider(): Web3KeyWriteProvider;

  getRpcGateway(): RpcGateway;

  getBackofficeGateway(): IBackofficeGateway;

  getWorkerGateway(): IWorkerGateway;

  canIssueJwtToken(transactionHash: PrefixedHex): Promise<IIssueJwtTokenResult>;

  issueJwtToken(
    transactionHash: PrefixedHex,
    thresholdKey: UUID,
    encryptionKey?: Base64,
  ): Promise<IJwtToken>;

  loginAsUser(
    user: Web3Address,
    encryptionKey?: Base64,
  ): Promise<IJwtToken | false>;

  requestUserEncryptionKey(): Promise<Base64>;

  getAnkrBalance(): Promise<IBalance>;

  getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryResponse>;

  getAggregatedPaymentHistory(
    params: IAggregatedPaymentHistoryRequest,
  ): Promise<IAggregatedPaymentHistoryResponse>;

  authorizeProvider(lifeTime: number): Promise<string>;

  sendAllowanceForPAYG(
    amount: BigNumber | BigNumber.Value,
  ): Promise<IWeb3SendResult>;

  rejectAllowanceForPAYG(): Promise<IWeb3SendResult>;

  getBalanceEndTime(blockchain?: string[]): Promise<number>;

  getPrivateStats(interval: PrivateStatsInterval): Promise<PrivateStats>;

  getLastLockedFundsEvent(user: Web3Address): Promise<EventData | undefined>;

  getLastProviderRequestEvent(
    user: Web3Address,
  ): Promise<EventData | undefined>;
}

export interface IProtocolPublicSdk {
  getBlockchains(): Promise<IBlockchainEntity[]>;

  getNodesWeight(): Promise<IWorkerNodesWeight[]>;

  getPublicUrls(): Promise<FetchBlockchainUrlsResult>;

  getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;
}
