import { Web3KeyReadProvider } from '@ankr.com/provider';
import { OauthGateway } from '../oauth';

import { IConfig, IJwtToken, JwtTokenFullData, Web3Address } from '../common';
import { PAYGReadContractManager } from '../PAYGContract';
import { ContractReadService } from './contractService';
import { TokenIssuerService } from './tokenIssuerService';

export class MultiRpcWeb3ReadSdk {
  private contractService?: ContractReadService;

  private PAYGReadContractManager?: PAYGReadContractManager;

  private tokenIssuerService?: TokenIssuerService;

  private oauthGateway?: OauthGateway;

  public constructor(
    private readonly keyProvider: Web3KeyReadProvider,
    private readonly config: IConfig,
  ) {}

  private getPAYGReadContractManager(): PAYGReadContractManager {
    this.PAYGReadContractManager =
      this.PAYGReadContractManager ||
      new PAYGReadContractManager(this.keyProvider, this.config);

    return this.PAYGReadContractManager;
  }

  public getOauthGateway(): OauthGateway {
    this.oauthGateway =
      this.oauthGateway || new OauthGateway(this.config.accountUrl);

    return this.oauthGateway;
  }

  private getTokenIssuerService(): TokenIssuerService {
    this.tokenIssuerService =
      this.tokenIssuerService ||
      new TokenIssuerService({
        config: this.config,
        PAYGContractManager: this.getPAYGReadContractManager(),
        oauthGateway: this.getOauthGateway(),
      });

    return this.tokenIssuerService;
  }

  public getContractService() {
    this.contractService =
      this.contractService ||
      new ContractReadService(this.getPAYGReadContractManager());

    return this.contractService;
  }

  public async getIssuedJwtTokenOrIssue(
    user: Web3Address,
    publicKey: string,
  ): Promise<JwtTokenFullData> {
    const tokenIssuerService = this.getTokenIssuerService();

    return tokenIssuerService.getIssuedJwtTokenOrIssue(user, publicKey);
  }

  public async getIssuedJwtToken(
    user: Web3Address,
  ): Promise<IJwtToken | undefined> {
    const tokenIssuerService = this.getTokenIssuerService();

    return tokenIssuerService.findIssuedToken(user);
  }
}
