import { IWeb3KeyProvider } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';

import { IApiGateway } from '../api';
import { Base64, IJwtToken, PrefixedHex, UUID, Web3Address } from '../common';
import { IContractManager, IDepositAnkrToWalletResult } from '../contract';
import {
  IBlockchainEntity,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
  IPrivateEndpoint,
  IProvider,
  IWorkerBackofficeGateway,
  IWorkerEndpoint,
  IWorkerGateway,
  IWorkerGlobalStatus,
  IWorkerNodesWeight,
  IWorkerUserLocation,
  RestrictedDomains,
  RestrictedIps,
  Timeframe,
} from '../worker';
import {
  IIsJwtTokenIssueAvailableResult,
  FetchBlockchainUrlsResult,
  LoginAsUserExResult,
} from './types';
import { RpcGateway } from '../rpc/RpcGateway';

export interface IMultiRpcSdk {
  addPrivateEndpoint(
    jwtToken: IJwtToken,
    endpoint: IPrivateEndpoint,
  ): Promise<IWorkerEndpoint>;

  calcJwtTokenHash(jwtToken: IJwtToken): Promise<string>;

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

  getWorkerBackofficeGateway(): IWorkerBackofficeGateway;

  getWorkerGateway(): IWorkerGateway;

  isJwtTokenIssueAvailable(
    transactionHash: PrefixedHex,
  ): Promise<IIsJwtTokenIssueAvailableResult>;

  issueJwtToken(
    transactionHash: PrefixedHex,
    thresholdKey: UUID,
    encryptionKey?: Base64,
  ): Promise<IJwtToken>;

  isUserHasDeposit(user: Web3Address): Promise<PrefixedHex | false>;

  loginAsAdmin(user: Web3Address): Promise<IJwtToken | false>;

  loginAsUser(
    user: Web3Address,
    encryptionKey?: Base64,
  ): Promise<IJwtToken | false>;

  loginAsUserEx(user: Web3Address): LoginAsUserExResult;

  requestUserEncryptionKey(): Promise<Base64>;

  getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse>;
}
