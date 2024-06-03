import { TBlockchain } from '@ankr.com/advanced-api/src/api/getLogs/types';

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
import { EXPIRED_TOKEN_ERROR } from './TokenIssuerServiceUtils';

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
    const { signed_token: signedToken, expires_at: expiresAt } = jwtToken;
    const decryptedToken = await this.tokenDecryptionService.decryptToken(
      signedToken,
      expiresAt,
    );

    const { token, tier } = await this.getWorkerGateway().importJwtToken(
      decryptedToken,
    );

    const workerTokenData: WorkerTokenData = {
      signedToken: decryptedToken,
      userEndpointToken: token,
      tier,
    };

    return { jwtToken, workerTokenData };
  }

  public async getAllLatestUserTierAssignedEventLogHashes(
    user: Web3Address,
    blockchain: TBlockchain
  ) {
    return this.PAYGContractManager.getAllLatestUserTierAssignedEventLogHashes(
      user,
      blockchain,
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
      if (error?.response?.data === EXPIRED_TOKEN_ERROR) {
        return { jwtToken: firstActiveToken };
      }

      throw error;
    }
  }

  public async getIssuedJwtTokenOrIssue(
    user: Web3Address,
    blockchain: TBlockchain
  ): Promise<JwtTokenFullData> {
    const issuedToken = await this.findIssuedTokenAndUpgrade(user);

    if (issuedToken) {
      return issuedToken;
    }

    return this.issueJwtToken(user, blockchain);
  }

  public async issueJwtToken(
    user: Web3Address,
    blockchain: TBlockchain
  ) {
    const PAYGTransactionHash = await this.getPAYGTransactionHash(user, blockchain);

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
      const publicKey =
        await this.tokenDecryptionService.requestMetamaskEncryptionKey();

      const jwtToken = await this.getConsensusGateway().requestJwtToken({
        public_key: publicKey,
        threshold_key: thresholdKeyId,
        transaction_hash: PAYGTransactionHash,
      });

      return this.upgradeJwtToken(jwtToken);
    }
  }

  public async upgradeInstantJwtToken(
    jwtData: string,
  ): Promise<JwtTokenFullData> {
    const decryptedToken = await this.tokenDecryptionService.decryptToken(
      jwtData,
    );

    try {
      const { token, tier } = await this.getWorkerGateway().importJwtToken(
        decryptedToken,
      );

      const workerTokenData: WorkerTokenData = {
        signedToken: decryptedToken,
        userEndpointToken: token,
        tier,
      };

      return { workerTokenData };
    } catch (error: any) {
      throw new Error('Failed to import jwt token');
    }
  }
}
