import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';

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
import { Base64, IJwtToken, PrefixedHex, UUID, Web3Address } from '../common';
import { IConsensusGateway } from '../consensus';
import { IPAYGContractManager } from '../PAYGContract';
import { IPremiumPlanContractManager } from '../PremiumPlanContract';
import { IWorkerGlobalStatus, IWorkerNodesWeight, Timeframe } from '../public';
import { RpcGateway } from '../rpc';
import {
  IPrivateEndpoint,
  IProvider,
  IWorkerEndpoint,
  IWorkerGateway,
  RestrictedDomains,
  RestrictedIps,
} from '../worker';
import { FetchBlockchainUrlsResult, IIssueJwtTokenResult } from './types';

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

  formatPrivateChains(
    blockchains: IBlockchainEntity[],
    jwtToken: IJwtToken,
  ): Promise<FetchBlockchainUrlsResult>;

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

  requestMetamaskEncryptionKey(): Promise<Base64>;

  requestEncryptionKeys(): Promise<Base64>;

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

  formatPublicChains(
    blockchains: IBlockchainEntity[],
  ): Promise<FetchBlockchainUrlsResult>;

  getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;
}
