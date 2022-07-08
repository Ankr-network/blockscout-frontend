import { IWeb3KeyProvider, IWeb3SendResult } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';

import { IApiGateway } from '../api';
import { Base64, IJwtToken, PrefixedHex, UUID, Web3Address } from '../common';
import { IContractManager, IDepositAnkrToWalletResult } from '../contract';
import {
  IPrivateEndpoint,
  IProvider,
  IWorkerEndpoint,
  IWorkerGateway,
  IWorkerGlobalStatus,
  IWorkerNodesWeight,
  IWorkerUserLocation,
  RestrictedDomains,
  RestrictedIps,
  Timeframe,
} from '../worker';
import { IIssueJwtTokenResult, FetchBlockchainUrlsResult } from './types';
import { RpcGateway } from '../rpc/RpcGateway';
import {
  IBalance,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
} from '../account';
import { IBackofficeGateway, IBlockchainEntity } from '../backoffice';

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

  fetchPublicUrls(): Promise<FetchBlockchainUrlsResult>;

  getApiGateway(): IApiGateway;

  getBlockchains(): Promise<IBlockchainEntity[]>;

  getBlockchainStats(blockchain: string): Promise<IWorkerGlobalStatus>;

  getBlockchainTimeFrameStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;

  getChainRestrictedDomains(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedDomains>;

  getChainRestrictedIps(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedIps>;

  getContractManager(): IContractManager;

  getKeyProvider(): IWeb3KeyProvider;

  getNodesWeight(): Promise<IWorkerNodesWeight[]>;

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

  getLastLockedFundsEvent(user: Web3Address): Promise<EventData | undefined>;

  getLastProviderRequestEvent(
    user: Web3Address,
  ): Promise<EventData | undefined>;
}
