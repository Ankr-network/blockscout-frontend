import { IConfig, Web3Address } from '../../common';
import { ConsensusGateway, IConsensusGateway } from '../../consensus';
import { WorkerGateway } from '../../worker';
import {
  PAYGContractManager as IPAYGContractManager,
  PAYGReadContractManager,
} from '../../PAYGContract';
import { FindJwtTokenService } from '../findJwtTokenService';

export interface BaseTokenIssuerServiceParams {
  PAYGContractManager: IPAYGContractManager | PAYGReadContractManager;
  config: IConfig;
}

export class BaseTokenIssuerService {
  private consensusGateway?: IConsensusGateway;

  private workerGateway?: WorkerGateway;

  protected PAYGContractManager: IPAYGContractManager | PAYGReadContractManager;

  protected tokenFinderService?: FindJwtTokenService;

  private config: IConfig;

  public constructor(params: BaseTokenIssuerServiceParams) {
    const { PAYGContractManager, config } = params;

    this.PAYGContractManager = PAYGContractManager;

    this.config = config;
  }

  protected getConsensusGateway(): IConsensusGateway {
    this.consensusGateway =
      this.consensusGateway ||
      new ConsensusGateway({
        baseURL: this.config.consensusUrl,
      });

    return this.consensusGateway;
  }

  protected getWorkerGateway(): WorkerGateway {
    this.workerGateway =
      this.workerGateway ||
      new WorkerGateway({
        baseURL: this.config.workerUrl,
      });

    return this.workerGateway;
  }

  protected getTokenFinderService(): FindJwtTokenService {
    this.tokenFinderService =
      this.tokenFinderService ||
      new FindJwtTokenService(this.getConsensusGateway());

    return this.tokenFinderService;
  }

  public async findIssuedToken(user: Web3Address) {
    return this.getTokenFinderService().findIssuedToken(user);
  }

  protected async getThresholdKey(): Promise<string | false> {
    const [thresholdKeys] = await this.getConsensusGateway().getThresholdKeys(
      0,
      1,
      {
        name: 'MultiRPC',
      },
    );

    if (!thresholdKeys.length) {
      throw new Error(`There is no threshold keys`);
    }

    return thresholdKeys[0].id;
  }

  protected async getPAYGTransactionHash(user: Web3Address) {
    return this.PAYGContractManager.getLatestUserTierAssignedEventLogHash(user);
  }
}
