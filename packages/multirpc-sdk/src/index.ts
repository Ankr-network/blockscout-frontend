import { IWeb3KeyProvider, IWeb3SendResult } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';
import { ApiGateway } from './gateway';
import { IConfig } from './config';
import { ContractManager } from './contract';
import { Base64, IJwtToken, PrefixedHex, UUID, Web3Address } from './types';
import {
  IBlockchainEntity,
  IWorkerGlobalStatus,
  Timeframe,
  WorkerGateway,
  IWorkerNodesWeight,
  IWorkerUserLocation,
} from './worker';
import { IManagedPromise, ManagedPromise } from './stepper';

export interface BlockchainUrls {
  blockchain: IBlockchainEntity;
  rpcUrl: string;
  wsUrl: string;
}

export type FetchBlockchainUrlsResult = Record<string, BlockchainUrls>;

export default class MultiRpcSdk {
  private workerGateway?: WorkerGateway;

  private apiGateway?: ApiGateway;

  private contractManager?: ContractManager;

  public constructor(
    private readonly keyProvider: IWeb3KeyProvider,
    private readonly config: IConfig,
  ) {}

  public async getBlockchains(): Promise<IBlockchainEntity[]> {
    return this.getWorkerGateway().apiGetBlockchains();
  }

  public async isUserHasDeposit(
    user: Web3Address,
  ): Promise<PrefixedHex | false> {
    return this.getContractManager().getLatestUserEventLogHash(user);
  }

  public loginAsUserEx(
    user: Web3Address,
    encryptionKey?: Base64,
  ): IManagedPromise<
    IJwtToken | false,
    'get_user_info' | 'get_encryption_key' | 'decrypt_jwt_token'
  > {
    const state: {
      transactionHash?: PrefixedHex;
      thresholdKey?: UUID;
      currentAccount?: Web3Address;
      encryptionKey?: Base64;
    } = {
      encryptionKey,
    };
    const promise = new ManagedPromise<
      typeof state,
      IJwtToken | false,
      'get_user_info' | 'get_encryption_key' | 'decrypt_jwt_token'
    >({});
    promise.newAction(
      'get_user_info',
      async (ss: typeof state, resolve): Promise<typeof state> => {
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
      async (ss: typeof state): Promise<typeof state> => {
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
      async (ss: typeof state, resolve): Promise<typeof state> => {
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
          await this.getWorkerGateway().apiImportJwtToken(
            jwtToken.signed_token,
          );
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

  public async loginAsUser(
    user: Web3Address,
    encryptionKey?: Base64,
  ): Promise<IJwtToken | false> {
    const transactionHash =
      await this.getContractManager().getLatestUserEventLogHash(user);
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

  public async loginAsAdmin(user: Web3Address): Promise<IJwtToken | false> {
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
    return jwtToken;
  }

  public async fetchPublicUrls(): Promise<FetchBlockchainUrlsResult> {
    const blockchains = await this.getWorkerGateway().apiGetBlockchains();
    const result: FetchBlockchainUrlsResult = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const blockchain of blockchains) {
      const hasRpc = blockchain.features.includes('rpc');
      const hasWs = blockchain.features.includes('ws');
      result[blockchain.id] = {
        blockchain,
        rpcUrl: hasRpc
          ? this.config.publicRpcUrl.replace('{blockchain}', blockchain.id)
          : '',
        wsUrl: hasWs
          ? this.config.publicWsUrl.replace('{blockchain}', blockchain.id)
          : '',
      };
    }
    return result;
  }

  public async fetchPrivateUrls(
    jwtToken: IJwtToken,
  ): Promise<FetchBlockchainUrlsResult> {
    const blockchains = await this.getWorkerGateway().apiGetBlockchains();
    const result: FetchBlockchainUrlsResult = {};
    const tokenHash = await this.calcJwtTokenHash(jwtToken);
    // eslint-disable-next-line no-restricted-syntax
    for (const blockchain of blockchains) {
      const hasRpc = blockchain.features.includes('rpc');
      const hasWs = blockchain.features.includes('ws');
      result[blockchain.id] = {
        blockchain,
        rpcUrl: hasRpc
          ? this.config.privateRpcUrl
              .replace('{blockchain}', blockchain.id)
              .replace('{user}', tokenHash)
          : '',
        wsUrl: hasWs
          ? this.config.privateWsUrl
              .replace('{blockchain}', blockchain.id)
              .replace('{user}', tokenHash)
          : '',
      };
    }
    return result;
  }

  public async getBlockchainStats(
    blockchain: string,
  ): Promise<IWorkerGlobalStatus> {
    return this.getWorkerGateway().apiGetGlobalStats(blockchain);
  }

  public async getBlockchainTimeFrameStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus> {
    return this.getWorkerGateway().apiGetTimeframeStats(blockchain, timeframe);
  }

  public async getNodesWeight(): Promise<IWorkerNodesWeight> {
    return this.getWorkerGateway().apiNodesWeight();
  }

  public async getUserLocation(): Promise<IWorkerUserLocation> {
    return this.getWorkerGateway().apiGetUserLocation();
  }

  public async depositAnkr(
    amount: BigNumber | BigNumber.Value,
  ): Promise<{ allowance?: IWeb3SendResult; deposit: IWeb3SendResult }> {
    return this.getContractManager().depositAnkrToWallet(new BigNumber(amount));
  }

  public async isJwtTokenIssueAvailable(transactionHash: PrefixedHex): Promise<{
    remainingBlocks?: number;
    isReady: boolean;
  }> {
    const latestKnownBlockNumber = await this.keyProvider
      .getWeb3()
      .eth.getBlockNumber();
    const transactionReceipt = await this.keyProvider
      .getWeb3()
      .eth.getTransactionReceipt(transactionHash);
    const passedBlocks =
      latestKnownBlockNumber - transactionReceipt.blockNumber;
    if (passedBlocks < this.config.confirmationBlocks) {
      return {
        remainingBlocks: this.config.confirmationBlocks - passedBlocks,
        isReady: false,
      };
    }
    return { remainingBlocks: 0, isReady: true };
  }

  public async requestUserEncryptionKey(): Promise<Base64> {
    const currentAccount = this.keyProvider.currentAccount();
    return this.getContractManager().getEncryptionPublicKey(currentAccount);
  }

  public async issueJwtToken(
    transactionHash: PrefixedHex,
    thresholdKey: UUID,
    encryptionKey?: Base64,
  ): Promise<IJwtToken> {
    const currentAccount = this.keyProvider.currentAccount();
    // requests user's x25519 encryption key
    if (!encryptionKey) {
      encryptionKey = await this.getContractManager().getEncryptionPublicKey(
        currentAccount,
      );
    }
    // send issue request to ankr protocol
    const jwtToken = await this.getApiGateway().requestJwtToken({
      transaction_hash: transactionHash,
      public_key: encryptionKey,
      threshold_key: thresholdKey,
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
      await this.getWorkerGateway().apiImportJwtToken(jwtToken.signed_token);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(`failed to import jwt token: ${e.message}`);
    }
    return jwtToken;
  }

  public async calcJwtTokenHash(jwtToken: IJwtToken): Promise<string> {
    const secretToken = await crypto.subtle.digest(
      { name: 'SHA-256' },
      new TextEncoder().encode(jwtToken.signed_token),
    );
    const tokenBuffer = Buffer.from(new Uint8Array(secretToken));
    return tokenBuffer.toString('hex');
  }

  /**
   * @internal for internal usage, try to avoid
   */
  public getApiGateway(): ApiGateway {
    if (this.apiGateway) return this.apiGateway;
    this.apiGateway = new ApiGateway(
      {
        baseURL: this.config.walletPublicUrl,
      },
      {
        baseURL: this.config.walletPrivateUrl,
      },
    );
    return this.apiGateway;
  }

  /**
   * @internal for internal usage, try to avoid
   */
  public getContractManager(): ContractManager {
    if (this.contractManager) return this.contractManager;
    this.contractManager = new ContractManager(this.keyProvider, this.config);
    return this.contractManager;
  }

  /**
   * @internal for internal usage, try to avoid
   */
  public getWorkerGateway(): WorkerGateway {
    if (this.workerGateway) return this.workerGateway;
    this.workerGateway = new WorkerGateway({
      baseURL: this.config.workerUrl,
    });
    return this.workerGateway;
  }

  public getKeyProvider(): IWeb3KeyProvider {
    return this.keyProvider;
  }
}

export * from './config';
export * from './contract';
export * from './gateway';
export * from './types';
export * from './utils';
export * from './worker';
