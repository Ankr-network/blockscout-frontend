import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';
import { Web3KeyReadProvider } from '@ankr.com/provider';

import { AccountingGateway } from '../accounting';
import {
  ContractReadService,
  TokenIssuerService,
  UsdcContractReadService,
  UsdtContractReadService,
} from '../services';
import { IConfig, IJwtToken, JwtTokenFullData, Web3Address } from '../common';
import {
  PAYGReadContractManager,
  UsdcPAYGReadContractManager,
  UsdtPAYGReadContractManager,
} from '../PAYGContract';

export class MultiRpcWeb3ReadSdk {
  private contractService?: ContractReadService;

  private contractServicesUsdc: Record<string, UsdcContractReadService> = {};

  private contractServicesUsdt: Record<string, UsdtContractReadService> = {};

  private PAYGReadContractManager?: PAYGReadContractManager;

  private tokenIssuerService?: TokenIssuerService;

  private accountingGateway?: AccountingGateway;

  private PAYGReadUsdcContractManagers:
    Record<string, UsdcPAYGReadContractManager> = {};

  private PAYGReadUsdtContractManagers:
    Record<string, UsdtPAYGReadContractManager> = {}; 

  public constructor(
    private readonly keyReadProvider: Web3KeyReadProvider,
    private readonly config: IConfig,
  ) { }

  private getPAYGReadContractManager(): PAYGReadContractManager {
    this.PAYGReadContractManager =
      this.PAYGReadContractManager ||
      new PAYGReadContractManager(this.keyReadProvider, this.config);

    return this.PAYGReadContractManager;
  }

  private getPAYGReadUsdcContractManager(tokenAddress: string) {
    this.PAYGReadUsdcContractManagers[tokenAddress] =
      this.PAYGReadUsdcContractManagers[tokenAddress] ||
      new UsdcPAYGReadContractManager(this.keyReadProvider, tokenAddress);

    return this.PAYGReadUsdcContractManagers[tokenAddress];
  }

  private getPAYGReadUsdtContractManager(tokenAddress: string) {
    this.PAYGReadUsdtContractManagers[tokenAddress] =
      this.PAYGReadUsdtContractManagers[tokenAddress] ||
      new UsdtPAYGReadContractManager(this.keyReadProvider, tokenAddress);

    return this.PAYGReadUsdtContractManagers[tokenAddress];
  }

  public getAccountingGateway() {
    this.accountingGateway =
      this.accountingGateway ||
      new AccountingGateway({ baseURL: this.config.accountUrl });

    return this.accountingGateway;
  }

  private getTokenIssuerService(): TokenIssuerService {
    this.tokenIssuerService =
      this.tokenIssuerService ||
      new TokenIssuerService({
        config: this.config,
        PAYGContractManager: this.getPAYGReadContractManager(),
        accountingGateway: this.getAccountingGateway(),
      });

    return this.tokenIssuerService;
  }

  public getContractService() {
    this.contractService =
      this.contractService ||
      new ContractReadService(this.getPAYGReadContractManager());

    return this.contractService;
  }

  getContractServiceUsdc(tokenAddress: string) {
    this.contractServicesUsdc[tokenAddress] =
      this.contractServicesUsdc[tokenAddress] ||
      new UsdcContractReadService(
        this.getPAYGReadUsdcContractManager(tokenAddress),
      );

    return this.contractServicesUsdc[tokenAddress];
  }

  getContractServiceUsdt(tokenAddress: string) {
    this.contractServicesUsdt[tokenAddress] =
      this.contractServicesUsdt[tokenAddress] ||
      new UsdtContractReadService(
        this.getPAYGReadUsdtContractManager(tokenAddress),
      );

    return this.contractServicesUsdt[tokenAddress];
  }

  public async getIssuedJwtTokenOrIssue(
    user: Web3Address,
    publicKey: string,
    blockchain: TBlockchain
  ): Promise<JwtTokenFullData> {
    const tokenIssuerService = this.getTokenIssuerService();

    return tokenIssuerService.getIssuedJwtTokenOrIssue(user, publicKey, blockchain);
  }

  public async getIssuedJwtToken(
    user: Web3Address,
  ): Promise<IJwtToken | undefined> {
    const tokenIssuerService = this.getTokenIssuerService();

    return tokenIssuerService.findIssuedToken(user);
  }

  public upgradeSyntheticJwtToken(token: string) {
    return this.getTokenIssuerService().upgradeSyntheticJwtToken(token);
  }

  getProvider() {
    return this.keyReadProvider;
  }
}
