import { IWeb3KeyProvider, IWeb3SendResult } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';
import { bytesToHex } from 'web3-utils';
import { TransactionReceipt } from 'web3-core';

import { ApiGateway, IApiGateway } from '../api';
import {
  Base64,
  IConfig,
  IJwtToken,
  PrefixedHex,
  UUID,
  Web3Address,
} from '../common';
import {
  ContractManager,
  IContractManager,
  IDepositAnkrToWalletResult,
} from '../contract';
import {
  IBlockchainEntity,
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
  WorkerBackofficeGateway,
  WorkerGateway,
} from '../worker';
import {
  IIsJwtTokenIssueAvailableResult,
  FetchBlockchainUrlsResult,
  ILoginAsUserExState,
  LoginAsUserExResult,
  LoginAsUserExResultAction,
} from './types';
import {
  AccountGateway,
  IAccountGateway,
  IBalance,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
} from '../account';
import { IMultiRpcSdk } from './interfaces';
import { ManagedPromise } from '../stepper';
import { RpcGateway } from '../rpc/RpcGateway';
import { PAYGContractManager, IPAYGContractManager } from '../PAYGContract';
import { catchSignError, formatPrivateUrls, formatPublicUrls } from './utils';

export class MultiRpcSdk implements IMultiRpcSdk {
  private workerGateway?: IWorkerGateway;

  private workerBackofficeGateway?: IWorkerBackofficeGateway;

  private apiGateway?: IApiGateway;

  private rpcGateway?: RpcGateway;

  private contractManager?: IContractManager;

  private PAYGContractManager?: IPAYGContractManager;

  private accountGateway?: IAccountGateway;

  public constructor(
    private readonly keyProvider: IWeb3KeyProvider,
    private readonly config: IConfig,
  ) {}

  async getBlockchains(): Promise<IBlockchainEntity[]> {
    return this.getWorkerGateway().getBlockchains();
  }

  async isUserHasDeposit(user: Web3Address): Promise<PrefixedHex | false> {
    return this.getContractManager().getLatestUserEventLogHash(user);
  }

  loginAsUserEx(user: Web3Address): LoginAsUserExResult {
    const promise = new ManagedPromise<
      ILoginAsUserExState,
      IJwtToken | false,
      LoginAsUserExResultAction
    >({});

    promise.newAction(
      'get_user_info',
      async (ss, resolve): Promise<ILoginAsUserExState> => {
        // get transaction hash
        const transactionHash =
          await this.getContractManager().getLatestUserEventLogHash(user);

        if (!transactionHash) {
          return resolve(false);
        }

        // find matching threshold key
        const [thresholdKeys] = await this.getApiGateway().getThresholdKeys(
          0,
          1,
          {
            name: 'MultiRPC',
          },
        );

        if (!thresholdKeys.length)
          throw new Error(`There is no threshold keys`);

        const thresholdKey = thresholdKeys[0].id;
        // get current account
        const currentAccount = this.keyProvider.currentAccount();

        // return new state
        return { ...ss, transactionHash, thresholdKey, currentAccount };
      },
    );

    promise.newAction(
      'get_encryption_key',
      async (ss): Promise<ILoginAsUserExState> => {
        const { currentAccount } = ss;

        // eslint-disable-next-line @typescript-eslint/no-shadow
        let { encryptionKey } = ss;

        if (!encryptionKey) {
          encryptionKey =
            await this.getContractManager().getEncryptionPublicKey(
              currentAccount!,
            );
        }

        return { ...ss, encryptionKey };
      },
    );

    promise.newAction(
      'decrypt_jwt_token',
      async (ss, resolve): Promise<ILoginAsUserExState> => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { transactionHash, thresholdKey, encryptionKey } = ss;

        // send issue request to Ankr protocol
        const jwtToken = await this.getApiGateway().requestJwtToken({
          transaction_hash: transactionHash!,
          public_key: encryptionKey!,
          threshold_key: thresholdKey!,
        });

        // decrypt signed token using client's private key
        const metaMaskJsonData = Buffer.from(
          jwtToken.signed_token,
          'base64',
        ).toString('ascii');

        jwtToken.signed_token =
          await this.getContractManager().decryptMessageUsingPrivateKey(
            metaMaskJsonData,
          );

        // try to import jwt token (backend do it also as well, so failure is not critical)
        try {
          await this.getWorkerGateway().importJwtToken(jwtToken.signed_token);
        } catch (e: any) {
          // eslint-disable-next-line no-console
          console.error(`failed to import jwt token: ${e.message}`);
        }

        // resolve final result
        return resolve(jwtToken);
      },
    );

    return promise;
  }

  async loginAsUser(
    user: Web3Address,
    encryptionKey: Base64,
  ): Promise<IJwtToken | false> {
    const transactionHash =
      await this.getPAYGContractManager().getLatestUserEventLogHash(user);

    if (transactionHash === false) {
      return false;
    }

    const [thresholdKeys] = await this.getApiGateway().getThresholdKeys(0, 1, {
      name: 'MultiRPC',
    });

    if (!thresholdKeys.length) throw new Error(`There is no threshold keys`);

    return this.issueJwtToken(
      transactionHash,
      thresholdKeys[0].id,
      encryptionKey,
    );
  }

  async loginAsAdmin(user: Web3Address): Promise<IJwtToken | false> {
    const [thresholdKeys] = await this.getApiGateway().getThresholdKeys(0, 1, {
      name: 'MultiRPC',
    });

    if (!thresholdKeys.length) throw new Error(`There is no threshold keys`);

    const currentAccount = this.keyProvider.currentAccount();

    // requests user's x25519 encryption key
    const publicKey = await this.getContractManager().getEncryptionPublicKey(
      currentAccount,
    );

    // send issue request to ankr protocol
    const jwtToken = await this.getApiGateway().issueJwtToken({
      jwt_token: user,
      threshold_key: thresholdKeys[0].id,
      public_key: publicKey,
      token_type: 'JWT_TOKEN_TYPE_ADMIN',
    });

    // decrypt signed token using client's private key
    const metaMaskJsonData = Buffer.from(
      jwtToken.signed_token,
      'base64',
    ).toString('ascii');
    jwtToken.signed_token =
      await this.getContractManager().decryptMessageUsingPrivateKey(
        metaMaskJsonData,
      );

    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return jwtToken;
  }

  async fetchPublicUrls(): Promise<FetchBlockchainUrlsResult> {
    const blockchainsApiResponse =
      await this.getWorkerGateway().getBlockchains();

    return formatPublicUrls(blockchainsApiResponse, this.config.publicRpcUrl);
  }

  async fetchPrivateUrls(
    jwtToken: IJwtToken,
  ): Promise<FetchBlockchainUrlsResult> {
    const blockchains = await this.getWorkerGateway().getBlockchains();
    // old hash for private urls
    // const tokenHash = await calcJwtTokenHash(jwtToken);

    return formatPrivateUrls(blockchains, this.config, jwtToken.endpoint_token);
  }

  async getBlockchainStats(blockchain: string): Promise<IWorkerGlobalStatus> {
    return this.getWorkerGateway().getGlobalStats(blockchain);
  }

  async getBlockchainTimeFrameStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus> {
    return this.getWorkerGateway().getTimeframeStats(blockchain, timeframe);
  }

  async getNodesWeight(): Promise<IWorkerNodesWeight[]> {
    return this.getWorkerGateway().getNodesWeight();
  }

  async getUserLocation(): Promise<IWorkerUserLocation> {
    return this.getWorkerGateway().getUserLocation();
  }

  async depositAnkr(
    amount: BigNumber | BigNumber.Value,
  ): Promise<IDepositAnkrToWalletResult> {
    return this.getContractManager().depositAnkrToWallet(new BigNumber(amount));
  }

  async depositAnkrToPAYG(
    amount: BigNumber | BigNumber.Value,
    publicKey: string,
  ): Promise<IWeb3SendResult> {
    return this.getPAYGContractManager().depositAnkr(
      new BigNumber(amount),
      publicKey,
    );
  }

  async getAllowanceForPAYG(
    amount: BigNumber | BigNumber.Value,
  ): Promise<IWeb3SendResult> {
    return this.getPAYGContractManager().getAllowance(new BigNumber(amount));
  }

  async rejectAllowanceForPAYG(): Promise<IWeb3SendResult> {
    return this.getPAYGContractManager().rejectAllowance();
  }

  async hasAllowanceForPAYG(
    amount: BigNumber | BigNumber.Value,
  ): Promise<boolean> {
    return this.getPAYGContractManager().hasEnoughAllowance(
      new BigNumber(amount),
    );
  }

  async getTransactionReceipt(
    transactionHash: PrefixedHex,
  ): Promise<TransactionReceipt> {
    const transactionReceipt = await this.keyProvider
      .getWeb3()
      .eth.getTransactionReceipt(transactionHash);

    return transactionReceipt;
  }

  async isJwtTokenIssueAvailable(
    transactionHash: PrefixedHex,
  ): Promise<IIsJwtTokenIssueAvailableResult> {
    const latestKnownBlockNumber = await this.keyProvider
      .getWeb3()
      .eth.getBlockNumber();

    const transactionReceipt = await this.getTransactionReceipt(
      transactionHash,
    );

    if (!transactionReceipt) {
      return {
        remainingBlocks: this.config.confirmationBlocks,
        isReady: false,
      };
    }

    const passedBlocks =
      latestKnownBlockNumber - transactionReceipt?.blockNumber;

    if (passedBlocks < this.config.confirmationBlocks) {
      return {
        remainingBlocks: this.config.confirmationBlocks - passedBlocks,
        isReady: false,
      };
    }

    return { remainingBlocks: 0, isReady: true };
  }

  async requestUserEncryptionKey(): Promise<Base64> {
    const currentAccount = this.keyProvider.currentAccount();

    return this.getContractManager().getEncryptionPublicKey(currentAccount);
  }

  async issueJwtToken(
    transactionHash: PrefixedHex,
    thresholdKey: UUID,
    encryptionKey: Base64,
  ): Promise<IJwtToken> {
    // send issue request to ankr protocol
    const jwtToken = await this.getApiGateway().requestJwtToken({
      public_key: encryptionKey,
      threshold_key: thresholdKey,
      transaction_hash: transactionHash,
    });
    // decrypt signed token using client's private key
    const metaMaskJsonData = Buffer.from(
      jwtToken.signed_token,
      'base64',
    ).toString('ascii');
    jwtToken.signed_token =
      await this.getPAYGContractManager().decryptMessageUsingPrivateKey(
        metaMaskJsonData,
      );

    // try to import jwt token (backend do it also as well, so failure is not critical)
    try {
      const { token } = await this.getWorkerGateway().importJwtToken(
        jwtToken.signed_token,
      );

      jwtToken.endpoint_token = token;
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(`failed to import jwt token: ${e.message}`);
    }

    return jwtToken;
  }

  /**
   * @internal for internal usage, try to avoid
   */
  getApiGateway(): IApiGateway {
    this.apiGateway =
      this.apiGateway ||
      new ApiGateway(
        {
          baseURL: this.config.walletPublicUrl,
        },
        {
          baseURL: this.config.walletPrivateUrl,
        },
      );

    return this.apiGateway;
  }

  getRpcGateway(): RpcGateway {
    this.rpcGateway =
      this.rpcGateway ||
      new RpcGateway({
        baseURL: this.config.publicRpcUrl,
      });

    return this.rpcGateway;
  }

  /**
   * @internal for internal usage, try to avoid
   */
  getContractManager(): IContractManager {
    this.contractManager =
      this.contractManager ||
      new ContractManager(this.keyProvider, this.config);

    return this.contractManager;
  }

  /**
   * @internal for internal usage, try to avoid
   */
  getPAYGContractManager(): IPAYGContractManager {
    this.PAYGContractManager =
      this.PAYGContractManager ||
      new PAYGContractManager(this.keyProvider, this.config);

    return this.PAYGContractManager;
  }

  /**
   * @internal for internal usage, try to avoid
   */
  getWorkerGateway(): IWorkerGateway {
    this.workerGateway =
      this.workerGateway ||
      new WorkerGateway({
        baseURL: this.config.workerUrl,
      });

    return this.workerGateway;
  }

  getWorkerBackofficeGateway(): IWorkerBackofficeGateway {
    this.workerBackofficeGateway =
      this.workerBackofficeGateway ||
      new WorkerBackofficeGateway({
        baseURL: this.config.workerUrl,
      });

    return this.workerBackofficeGateway;
  }

  /**
   * @internal for internal usage, try to avoid
   */
  getAccountGateway(): IAccountGateway {
    this.accountGateway =
      this.accountGateway ||
      new AccountGateway({
        baseURL: this.config.accountUrl,
      });

    return this.accountGateway;
  }

  getKeyProvider(): IWeb3KeyProvider {
    return this.keyProvider;
  }

  async fetchProvider(jwtToken: IJwtToken): Promise<IProvider> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().getProvider();
  }

  async fetchPrivateEndpoints(jwtToken: IJwtToken): Promise<IWorkerEndpoint> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().getEndpoints();
  }

  async addPrivateEndpoint(
    jwtToken: IJwtToken,
    endpoint: IPrivateEndpoint,
  ): Promise<IWorkerEndpoint> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().addPrivateEndpoint(endpoint);
  }

  async editPrivateEndpoint(
    jwtToken: IJwtToken,
    endpoint: IPrivateEndpoint,
  ): Promise<IWorkerEndpoint> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().editPrivateEndpoint(endpoint);
  }

  async deletePrivateEndpoint(
    jwtToken: IJwtToken,
    endpointId: string,
  ): Promise<void> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().deletePrivateEndpoint(endpointId);
  }

  async getChainRestrictedDomains(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedDomains> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().getChainRestrictedDomains(chainId);
  }

  async getChainRestrictedIps(
    jwtToken: IJwtToken,
    chainId: string,
  ): Promise<RestrictedIps> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().getChainRestrictedIps(chainId);
  }

  async editChainRestrictedDomains(
    jwtToken: IJwtToken,
    chainId: string,
    domains: string[],
  ): Promise<RestrictedDomains> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().editChainRestrictedDomains(chainId, domains);
  }

  async editChainRestrictedIps(
    jwtToken: IJwtToken,
    chainId: string,
    domains: string[],
  ): Promise<RestrictedIps> {
    this.getWorkerGateway().addJwtToken(jwtToken);
    this.getWorkerBackofficeGateway().addJwtToken(jwtToken);

    return this.getWorkerGateway().editChainRestrictedIps(chainId, domains);
  }

  async getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse> {
    return this.getAccountGateway().getPaymentHistory(params);
  }

  async getAnkrBalance(): Promise<IBalance> {
    return this.getAccountGateway().getAnkrBalance();
  }

  async sign(
    data: Buffer | string | Record<string, unknown>,
    address: string,
  ): Promise<string> {
    try {
      if (typeof data === 'object') {
        data = bytesToHex(data as any);
      }

      const token = await this.keyProvider
        .getWeb3()
        .eth.personal.sign(data, address, '');

      return token;
    } catch (error: any) {
      return catchSignError(error);
    }
  }

  async signLoginData(lifeTime: number): Promise<string> {
    const currentTime = Math.floor(new Date().getTime());
    const expiresAfter = currentTime + lifeTime;
    const data = `Multirpc Login Message:\n${expiresAfter}`;
    const address = this.getKeyProvider().currentAccount();

    const signature = await this.sign(data, address);
    const formData = `signature=${signature}&address=${address}&expires=${expiresAfter}`;

    return Buffer.from(formData, 'utf8').toString('base64');
  }

  public async authorizeProvider(lifeTime: number): Promise<string> {
    if (!this.keyProvider) {
      throw new Error('Key provider must be connected');
    }

    const token = await this.signLoginData(lifeTime);

    await this.getAccountGateway().addToken(token);

    return token;
  }
}
