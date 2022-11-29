import {
  DATE_MULTIPLIER,
  IConfig,
  IJwtToken,
  JwtTokenFullData,
  PrefixedHex,
  UUID,
  Web3Address,
  WorkerTokenData,
} from '../../common';
import { ConsensusGateway, IConsensusGateway } from '../../consensus';
import { WorkerGateway } from '../../worker';
import {
  PAYGContractManager as IPAYGContractManager,
  PAYGReadContractManager,
} from '../../PAYGContract';
import { FindJwtTokenService } from '../findJwtTokenService';
import { OauthGateway } from '../../oauth';
import { formatHexToString } from './TokenIssuerServiceUtils';

interface LoginServiceParams {
  PAYGContractManager: IPAYGContractManager | PAYGReadContractManager;
  config: IConfig;
  oauthGateway: any;
}

export class TokenIssuerService {
  private consensusGateway?: IConsensusGateway;

  private workerGateway?: WorkerGateway;

  private oauthGateway: OauthGateway;

  private PAYGContractManager: IPAYGContractManager | PAYGReadContractManager;

  private config: IConfig;

  public constructor(params: LoginServiceParams) {
    const { PAYGContractManager, config, oauthGateway } = params;

    this.PAYGContractManager = PAYGContractManager;
    this.oauthGateway = oauthGateway;

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
    address: string,
  ): Promise<JwtTokenFullData> {
    try {
      const signedToken = jwtToken.signed_token;

      const upgradedToken = await this.oauthGateway.decodeJwtToken({
        address,
        data_hex: signedToken,
      });

      const strValue = formatHexToString(upgradedToken?.decrypted_data_hex);

      const { token, tier } = await this.getWorkerGateway().importJwtToken(
        strValue,
      );

      const workerTokenData: WorkerTokenData = {
        signedToken: strValue,
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

  public async findIssuedTokenAndUpgrade(user: Web3Address) {
    const firstActiveToken = await this.findIssuedToken(user);

    if (!firstActiveToken) {
      return undefined;
    }

    const expiresAt = Number(firstActiveToken.expires_at) * DATE_MULTIPLIER;

    if (expiresAt < Date.now()) {
      return { jwtToken: firstActiveToken };
    }

    return this.upgradeJwtToken(firstActiveToken, user);
  }

  private async issueJwtToken(
    transactionHash: PrefixedHex,
    thresholdKey: UUID,
    user: Web3Address,
    publicKey: string,
  ) {
    // send issue request to ankr protocol
    const jwtToken = await this.getConsensusGateway().requestJwtToken({
      public_key: publicKey,
      threshold_key: thresholdKey,
      transaction_hash: transactionHash,
    });

    return this.upgradeJwtToken(jwtToken, user);
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

  public async getIssuedJwtToken(
    user: Web3Address,
    publicKey: string,
  ): Promise<JwtTokenFullData> {
    const issuedToken = await this.findIssuedTokenAndUpgrade(user);

    if (issuedToken) {
      return issuedToken;
    }

    const PAYGTransactionHash = await this.getPAYGTransactionHash(user);

    if (!PAYGTransactionHash) return {};

    const thresholdKeyId = await this.getThresholdKey();

    if (!thresholdKeyId) return {};

    return this.issueJwtToken(
      PAYGTransactionHash,
      thresholdKeyId,
      user,
      publicKey,
    );
  }

  public async getIssuedJwtTokenOrIssue(
    user: Web3Address,
    publicKey: string,
  ): Promise<JwtTokenFullData> {
    const issuedToken = await this.findIssuedTokenAndUpgrade(user);

    if (issuedToken) {
      return issuedToken;
    }

    const PAYGTransactionHash = await this.getPAYGTransactionHash(user);

    if (!PAYGTransactionHash) return {};

    const thresholdKeyId = await this.getThresholdKey();

    if (!thresholdKeyId) return {};

    return this.issueJwtToken(
      PAYGTransactionHash,
      thresholdKeyId,
      user,
      publicKey,
    );
  }
}
