import {
  IJwtToken,
  JwtTokenFullData,
  Web3Address,
  WorkerTokenData,
} from '../../common';
import {
  METAMASK_REJECTED_OPERATION_CODE,
  TokenDecryptionService,
} from '../tokenDecryptionService';
import {
  BaseTokenIssuerService,
  BaseTokenIssuerServiceParams,
} from './BaseTokenIssuerService';

interface Web3TokenIssuerServiceParams extends BaseTokenIssuerServiceParams {
  tokenDecryptionService: TokenDecryptionService;
}

export class Web3TokenIssuerService extends BaseTokenIssuerService {
  private tokenDecryptionService: TokenDecryptionService;

  public constructor(params: Web3TokenIssuerServiceParams) {
    const { tokenDecryptionService, ...rest } = params;

    super(rest);

    this.tokenDecryptionService = tokenDecryptionService;
  }

  private async upgradeJwtToken(
    jwtToken: IJwtToken,
  ): Promise<JwtTokenFullData> {
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
  }

  public async getAllLatestUserTierAssignedEventLogHashes(user: Web3Address) {
    return this.PAYGContractManager.getAllLatestUserTierAssignedEventLogHashes(
      user,
    );
  }

  public async getAllIssuedJwtTokens(user: Web3Address) {
    return this.getTokenFinderService().getAllIssuedJwtTokens(user);
  }

  private async findIssuedTokenAndUpgrade(user: Web3Address) {
    const firstActiveToken = await this.findIssuedToken(user);

    if (!firstActiveToken) {
      return undefined;
    }

    try {
      const fullTokenData = await this.upgradeJwtToken(firstActiveToken);

      return fullTokenData;
    } catch (error: any) {
      if (error?.code !== METAMASK_REJECTED_OPERATION_CODE) {
        return { jwtToken: firstActiveToken };
      }

      throw error;
    }
  }

  public async getIssuedJwtTokenOrIssue(
    user: Web3Address,
  ): Promise<JwtTokenFullData> {
    const issuedToken = await this.findIssuedTokenAndUpgrade(user);

    if (issuedToken) {
      return issuedToken;
    }

    return this.issueJwtToken(user);
  }

  public async issueJwtToken(user: Web3Address) {
    const PAYGTransactionHash = await this.getPAYGTransactionHash(user);

    if (!PAYGTransactionHash) return {};

    const thresholdKeyId = await this.getThresholdKey();

    if (!thresholdKeyId) return {};

    // try to requestJwtToken with sigUtil publickey
    try {
      if (!this.tokenDecryptionService.publicKey) {
        await this.tokenDecryptionService.requestEncryptionKeys();
      }

      const jwtToken = await this.getConsensusGateway().requestJwtToken({
        public_key: this.tokenDecryptionService.publicKey,
        threshold_key: thresholdKeyId,
        transaction_hash: PAYGTransactionHash,
      });

      const tokenFullData = await this.upgradeJwtToken(jwtToken);

      return tokenFullData;
    } catch (error: any) {
      if (error?.code === METAMASK_REJECTED_OPERATION_CODE) {
        throw error;
      }
      // if error we try to use mm public key
      await this.tokenDecryptionService.requestMetamaskEncryptionKey();

      const jwtToken = await this.getConsensusGateway().requestJwtToken({
        public_key: this.tokenDecryptionService.publicKey,
        threshold_key: thresholdKeyId,
        transaction_hash: PAYGTransactionHash,
      });

      return this.upgradeJwtToken(jwtToken);
    }
  }
}
