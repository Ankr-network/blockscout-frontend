import { Web3KeyWriteProvider } from '@ankr.com/provider';

import { IConfig, JwtTokenFullData, Web3Address } from '../common';
import { PAYGContractManager } from '../PAYGContract';
import { LoginSignService } from './loginSignService';
import { Web3LoginService } from './web3LoginService';
import { TokenDecryptionService } from './tokenDecryptionService';
import { ContractService } from './contractService';

export class MultiRpcWeb3Sdk {
  private PAYGContractManager?: PAYGContractManager;

  private loginService?: Web3LoginService;

  private tokenDecryptionService?: TokenDecryptionService;

  private contractService?: ContractService;

  public constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    private readonly config: IConfig,
  ) {}

  public getKeyProvider() {
    return this.keyProvider;
  }

  public async getIssuedJwtToken(user: Web3Address): Promise<JwtTokenFullData> {
    const loginService = this.getLoginService();

    return loginService.getIssuedJwtToken(user);
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

  private getLoginService(): Web3LoginService {
    this.loginService =
      this.loginService ||
      new Web3LoginService({
        config: this.config,
        PAYGContractManager: this.getPAYGContractManager(),
        tokenDecryptionService: this.getTokenDecryptionService(),
      });

    return this.loginService;
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
