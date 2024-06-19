import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';
import { Web3KeyReadProvider, Web3KeyWriteProvider } from '@ankr.com/provider';

import {
  ContractService,
  LoginSignService,
  TokenDecryptionService,
  USDCContractService,
  USDTContractService,
  Web3TokenIssuerService,
} from '../services';
import {
  DATE_MULTIPLIER,
  IConfig,
  JwtTokenFullData,
  TContractAddresses,
  Tier,
  Web3Address,
} from '../common';
import { PAYGContractManager } from '../PAYGContract';
import { UsdtPAYGContractManager } from '../PAYGContract/UsdtPAYGContractManager';
import { UsdcPAYGContractManager } from '../PAYGContract/UsdcPAYGContractManager';
import { parseJwtToken } from './utils';

export class MultiRpcWeb3Sdk {
  private PAYGContractManager?: PAYGContractManager;

  private usdtContractManager?: UsdtPAYGContractManager;

  private usdcContractManager?: UsdcPAYGContractManager;

  private tokenIssuerService?: Web3TokenIssuerService;

  private tokenDecryptionService?: TokenDecryptionService;

  private contractService?: ContractService;

  private usdtContractService?: USDTContractService;

  private usdcContractService?: USDCContractService;

  public constructor(
    private readonly keyWriteProvider: Web3KeyWriteProvider,
    private readonly keyReadProvider: Web3KeyReadProvider,
    private readonly config: IConfig,
  ) { }

  public getKeyWriteProvider() {
    return this.keyWriteProvider;
  }

  public getKeyReadProvider() {
    return this.keyReadProvider;
  }

  public async isOldPremiumAndActiveToken(
    user: Web3Address,
    blockchain: TBlockchain
  ) {
    const tokenIssuerService = this.getTokenIssuerService();

    const allTokens = await tokenIssuerService.getAllIssuedJwtTokens(user);
    const transactionHashes =
      await tokenIssuerService.getAllLatestUserTierAssignedEventLogHashes(user, blockchain);

    const isNewUserWithPAYGTransaction =
      (!allTokens || allTokens?.length === 0) && Boolean(transactionHashes);

    if (isNewUserWithPAYGTransaction) return false;

    const premiumToken = allTokens?.[0];

    const parsedToken = parseJwtToken(premiumToken?.signing_data);
    const isPremium = parsedToken?.sub?.tier === Tier.Premium;
    const isExpiredToken =
      Number(premiumToken?.expires_at) * DATE_MULTIPLIER < Date.now();

    return isPremium && !isExpiredToken;
  }

  public async getOldPremiumJwtToken(
    user: Web3Address,
    blockchain: TBlockchain
  ): Promise<JwtTokenFullData> {
    const tokenIssuerService = this.getTokenIssuerService();

    return tokenIssuerService.getIssuedJwtTokenOrIssue(user, blockchain);
  }

  public async issueJwtToken(
    user: Web3Address,
    blockchain: TBlockchain
  ): Promise<JwtTokenFullData> {
    const tokenIssuerService = this.getTokenIssuerService();

    return tokenIssuerService.issueJwtToken(user, blockchain);
  }

  public async getAuthorizationToken(lifeTime: number): Promise<string> {
    if (!this.keyWriteProvider) {
      throw new Error('Key provider must be connected');
    }

    const loginSignService = new LoginSignService(this.keyWriteProvider);

    const authorizationToken = await loginSignService.signLoginData(
      lifeTime,
      'Multirpc Login Message:',
    );

    return authorizationToken;
  }

  private getPAYGContractManager(): PAYGContractManager {
    this.PAYGContractManager =
      this.PAYGContractManager ||
      new PAYGContractManager(
        this.keyWriteProvider,
        this.keyReadProvider,
        this.config,
      );

    return this.PAYGContractManager;
  }

  private getUsdtContractManager({
    depositContractAddress,
    tokenAddress,
  }: TContractAddresses): UsdtPAYGContractManager {
    const isContractManagerInitializedWithCurrentAddresses =
      this.usdtContractManager?.depositContractAddress ===
      depositContractAddress &&
      this.usdtContractManager?.tokenAddress ===
      tokenAddress;

    const canUseCurrentManager =
      this.usdtContractManager &&
      isContractManagerInitializedWithCurrentAddresses;

    this.usdtContractManager = canUseCurrentManager
      ? this.usdtContractManager!
      : new UsdtPAYGContractManager(
        this.keyWriteProvider,
        this.keyReadProvider,
        tokenAddress,
        depositContractAddress,
      );

    return this.usdtContractManager;
  }

  private getUsdcContractManager({
    depositContractAddress,
    tokenAddress,
  }: TContractAddresses): UsdcPAYGContractManager {
    const isContractManagerInitializedWithCurrentAddresses =
      this.usdcContractManager?.depositContractAddress ===
      depositContractAddress &&
      this.usdcContractManager?.tokenAddress ===
      tokenAddress;

    const canUseCurrentManager =
      this.usdcContractManager &&
      isContractManagerInitializedWithCurrentAddresses;

    this.usdcContractManager = canUseCurrentManager
      ? this.usdcContractManager!
      : new UsdcPAYGContractManager(
        this.keyWriteProvider,
        this.keyReadProvider,
        tokenAddress,
        depositContractAddress,
      );

    return this.usdcContractManager;
  }

  public getTokenDecryptionService(): TokenDecryptionService {
    this.tokenDecryptionService =
      this.tokenDecryptionService ||
      new TokenDecryptionService(this.keyWriteProvider);

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
        this.keyWriteProvider,
        this.getPAYGContractManager(),
        this.config,
      );

    return this.contractService;
  }

  public getUsdtContractService({
    depositContractAddress,
    tokenAddress,
  }: TContractAddresses): USDTContractService {
    const isContractManagerInitializedWithCurrentAddresses =
      this.usdtContractManager?.depositContractAddress ===
      depositContractAddress &&
      this.usdtContractManager?.tokenAddress ===
      tokenAddress;

    const canUseCurrentManager =
      this.usdtContractService &&
      isContractManagerInitializedWithCurrentAddresses;

    this.usdtContractService = canUseCurrentManager
      ? this.usdtContractService!
      : new USDTContractService(
        this.keyWriteProvider,
        this.getUsdtContractManager({
          depositContractAddress,
          tokenAddress,
        }),
      );

    return this.usdtContractService;
  }

  public getUsdcContractService({
    depositContractAddress,
    tokenAddress,
  }: TContractAddresses): USDCContractService {
    const isContractManagerInitializedWithCurrentAddresses =
      this.usdcContractManager?.depositContractAddress ===
      depositContractAddress &&
      this.usdcContractManager?.tokenAddress ===
      tokenAddress;

    const canUseCurrentManager =
      this.usdcContractService &&
      isContractManagerInitializedWithCurrentAddresses;

    this.usdcContractService = canUseCurrentManager
      ? this.usdcContractService!
      : new USDCContractService(
        this.keyWriteProvider,
        this.getUsdcContractManager({
          depositContractAddress,
          tokenAddress,
        }),
      );

    return this.usdcContractService;
  }

  public upgradeInstantJwtToken(token: string) {
    return this.getTokenIssuerService().upgradeInstantJwtToken(token);
  }
}
