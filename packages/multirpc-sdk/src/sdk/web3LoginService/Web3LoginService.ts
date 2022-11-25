import {
  IConfig,
  IJwtToken,
  JwtTokenFullData,
  PrefixedHex,
  UUID,
  Web3Address,
  WorkerTokenData,
} from '../../common';
import { TokenDecryptionService } from '../tokenDecryptionService';
import { ConsensusGateway, IConsensusGateway } from '../../consensus';
import { WorkerGateway } from '../../worker';
import { PAYGContractManager as IPAYGContractManager } from '../../PAYGContract';
import { FindJwtTokenService } from '../findJwtTokenService';

interface LoginServiceParams {
  tokenDecryptionService: TokenDecryptionService;
  PAYGContractManager: IPAYGContractManager;
  config: IConfig;
}

export class Web3LoginService {
  private consensusGateway?: IConsensusGateway;

  private workerGateway?: WorkerGateway;

  private tokenDecryptionService: TokenDecryptionService;

  private PAYGContractManager: IPAYGContractManager;

  private config: IConfig;

  public constructor(params: LoginServiceParams) {
    const { tokenDecryptionService, PAYGContractManager, config } = params;

    this.tokenDecryptionService = tokenDecryptionService;
    this.PAYGContractManager = PAYGContractManager;

    this.config = config;
  }

  private getConsensusGateway(): IConsensusGateway {
    this.consensusGateway =
      this.consensusGateway ||
      new ConsensusGateway({
        baseURL: this.config.consensusUrl,
      });

    return this.consensusGateway;
  }

  private getWorkerGateway(): WorkerGateway {
    this.workerGateway =
      this.workerGateway ||
      new WorkerGateway({
        baseURL: this.config.workerUrl,
      });

    return this.workerGateway;
  }

  private async upgradeJwtToken(
    jwtToken: IJwtToken,
  ): Promise<JwtTokenFullData> {
    try {
      const signedToken = await this.tokenDecryptionService.decryptToken(
        jwtToken,
      );

      const { token, tier } = await this.getWorkerGateway().importJwtToken(
        signedToken,
      );

      const workerTokenData: WorkerTokenData = {
        signedToken,
        userEndpointToken: token,
        tier,
      };

      return { jwtToken, workerTokenData };
    } catch (error: any) {
      throw new Error('Failed to import jwt token');
    }
  }

  public async findIssuedToken(user: Web3Address) {
    const findJwtTokenService = new FindJwtTokenService(
      this.getConsensusGateway(),
    );

    return findJwtTokenService.findIssuedToken(user);
  }

  private async findIssuedTokenAndUpgrade(user: Web3Address) {
    const firstActiveToken = await this.findIssuedToken(user);

    if (!firstActiveToken) {
      return undefined;
    }

    return this.upgradeJwtToken(firstActiveToken);
  }

  private async issueJwtToken(
    transactionHash: PrefixedHex,
    thresholdKey: UUID,
  ) {
    if (!this.tokenDecryptionService.publicKey) {
      await this.tokenDecryptionService.requestEncryptionKeys();
    }

    // send issue request to ankr protocol
    const jwtToken = await this.getConsensusGateway().requestJwtToken({
      public_key: this.tokenDecryptionService.publicKey,
      threshold_key: thresholdKey,
      transaction_hash: transactionHash,
    });

    return this.upgradeJwtToken(jwtToken);
  }

  private async getThresholdKey(): Promise<string | false> {
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

  private async getPAYGTransactionHash(user: Web3Address) {
    return this.PAYGContractManager.getLatestUserTierAssignedEventLogHash(user);
  }

  public async getIssuedJwtToken(user: Web3Address): Promise<JwtTokenFullData> {
    const issuedToken = await this.findIssuedTokenAndUpgrade(user);

    if (issuedToken) {
      return issuedToken;
    }

    const PAYGTransactionHash = await this.getPAYGTransactionHash(user);

    if (!PAYGTransactionHash) return {};

    const thresholdKeyId = await this.getThresholdKey();

    if (!thresholdKeyId) return {};

    return this.issueJwtToken(PAYGTransactionHash, thresholdKeyId);
  }
}
