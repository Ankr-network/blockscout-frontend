import {
  IJwtToken,
  JwtTokenFullData,
  PrefixedHex,
  UUID,
  Web3Address,
  WorkerTokenData,
} from '../../common';
import { OauthGateway } from '../../oauth';
import { formatHexToString } from './TokenIssuerServiceUtils';
import {
  BaseTokenIssuerService,
  BaseTokenIssuerServiceParams,
} from './BaseTokenIssuerService';

interface TokenIssuerServiceParams extends BaseTokenIssuerServiceParams {
  oauthGateway: OauthGateway;
}

export class TokenIssuerService extends BaseTokenIssuerService {
  private oauthGateway: OauthGateway;

  public constructor(params: TokenIssuerServiceParams) {
    const { oauthGateway, ...rest } = params;

    super(rest);

    this.oauthGateway = oauthGateway;
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

  public async findIssuedTokenAndUpgrade(user: Web3Address) {
    const firstActiveToken = await this.findIssuedToken(user);

    if (!firstActiveToken) {
      return undefined;
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

  public async upgradeSyntheticJwtToken(
    strValue: string,
  ): Promise<JwtTokenFullData> {
    try {
      const { token, tier } = await this.getWorkerGateway().importJwtToken(
        strValue,
      );

      const workerTokenData: WorkerTokenData = {
        signedToken: strValue,
        userEndpointToken: token,
        tier,
      };

      return { workerTokenData };
    } catch (error: any) {
      throw new Error('Failed to import jwt token');
    }
  }
}
