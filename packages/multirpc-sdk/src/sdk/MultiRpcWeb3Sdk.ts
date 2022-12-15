import { Web3KeyWriteProvider } from '@ankr.com/provider';

import { IConfig, JwtTokenFullData, Web3Address } from '../common';
import { PAYGContractManager } from '../PAYGContract';
import {
  Web3TokenIssuerService,
  LoginSignService,
  TokenDecryptionService,
  ContractService,
} from '../services';

export class MultiRpcWeb3Sdk {
  private PAYGContractManager?: PAYGContractManager;

  private tokenIssuerService?: Web3TokenIssuerService;

  private tokenDecryptionService?: TokenDecryptionService;

  private contractService?: ContractService;

  public constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    private readonly config: IConfig,
  ) {}

  public getKeyProvider() {
    return this.keyProvider;
  }

  public async shouldIssueToken(user: Web3Address) {
    const tokenIssuerService = this.getTokenIssuerService();

    const allTokens = await tokenIssuerService.getAllIssuedJwtTokens(user);
    const transactionHashes =
      await tokenIssuerService.getAllLatestUserTierAssignedEventLogHashes(user);

    const isNewUser =
      (!allTokens || allTokens?.length === 0) && transactionHashes;

    const hasPAYGTransaction = Boolean(
      transactionHashes &&
        !transactionHashes?.includes(allTokens?.[0]?.id as string),
    );

    const isPremiumUserWithExpiredTokenAndPAYGTransaction =
      allTokens && allTokens.length === 1 && hasPAYGTransaction;

    return Boolean(
      isNewUser || isPremiumUserWithExpiredTokenAndPAYGTransaction,
    );
  }

  public async getIssuedJwtTokenOrIssue(
    user: Web3Address,
  ): Promise<JwtTokenFullData> {
    const tokenIssuerService = this.getTokenIssuerService();

    const shouldIssueToken = await this.shouldIssueToken(user);

    if (shouldIssueToken) {
      return this.issueJwtToken(user);
    }

    return tokenIssuerService.getIssuedJwtTokenOrIssue(user);
  }

  public async issueJwtToken(user: Web3Address): Promise<JwtTokenFullData> {
    const tokenIssuerService = this.getTokenIssuerService();

    return tokenIssuerService.issueJwtToken(user);
  }

  public async getAuthorizationToken(lifeTime: number): Promise<string> {
    if (!this.keyProvider) {
      throw new Error('Key provider must be connected');
    }

    const loginSignService = new LoginSignService(this.keyProvider);

    const authorizationToken = await loginSignService.signLoginData(
      lifeTime,
      'Multirpc Login Message:',
    );

    return authorizationToken;
  }

  private getPAYGContractManager(): PAYGContractManager {
    this.PAYGContractManager =
      this.PAYGContractManager ||
      new PAYGContractManager(this.keyProvider, this.config);

    return this.PAYGContractManager;
  }

  public getTokenDecryptionService(): TokenDecryptionService {
    this.tokenDecryptionService =
      this.tokenDecryptionService ||
      new TokenDecryptionService(this.keyProvider);

    return this.tokenDecryptionService;
  }

  private getTokenIssuerService(): Web3TokenIssuerService {
    this.tokenIssuerService =
      this.tokenIssuerService ||
      new Web3TokenIssuerService({
        config: this.config,
        PAYGContractManager: this.getPAYGContractManager(),
        tokenDecryptionService: this.getTokenDecryptionService(),
      });

    return this.tokenIssuerService;
  }

  public getContractService() {
    this.contractService =
      this.contractService ||
      new ContractService(
        this.keyProvider,
        this.getPAYGContractManager(),
        this.config,
      );

    return this.contractService;
  }
}
