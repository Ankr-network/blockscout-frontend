import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';
import { IWeb3SendResult, Web3KeyWriteProvider } from '@ankr.com/provider';

import { IApiGateway } from '../api';
import { Base64, IJwtToken, PrefixedHex, UUID, Web3Address } from '../common';
import { IContractManager, IDepositAnkrToWalletResult } from '../contract';
import {
  IPrivateEndpoint,
  IProvider,
  IWorkerEndpoint,
  IWorkerGateway,
  IWorkerUserLocation,
  RestrictedDomains,
  RestrictedIps,
} from '../worker';
import { IIssueJwtTokenResult, FetchBlockchainUrlsResult } from './types';
import { RpcGateway } from '../rpc/RpcGateway';
import {
  IBalance,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
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

  depositAnkr(
    amount: BigNumber | BigNumber.Value,
  ): Promise<IDepositAnkrToWalletResult>;

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

  getApiGateway(): IApiGateway;

  getChainRestrictedDomains(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedDomains>;

  getChainRestrictedIps(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedIps>;

  getContractManager(): IContractManager;

  getPAYGContractManager(): IPAYGContractManager;

  getKeyProvider(): Web3KeyWriteProvider;

  getRpcGateway(): RpcGateway;

  getUserLocation(): Promise<IWorkerUserLocation>;

  getBackofficeGateway(): IBackofficeGateway;

  getWorkerGateway(): IWorkerGateway;

  canIssueJwtToken(transactionHash: PrefixedHex): Promise<IIssueJwtTokenResult>;

  issueJwtToken(
    transactionHash: PrefixedHex,
    thresholdKey: UUID,
    encryptionKey?: Base64,
  ): Promise<IJwtToken>;

  hasDeposit(user: Web3Address): Promise<PrefixedHex | false>;

  loginAsUser(
    user: Web3Address,
    encryptionKey?: Base64,
  ): Promise<IJwtToken | false>;

  requestUserEncryptionKey(): Promise<Base64>;

  getAnkrBalance(): Promise<IBalance>;

  getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse>;

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
