import { DATE_MULTIPLIER, IJwtToken, Web3Address } from '../../common';
import { IConsensusGateway } from '../../consensus';

export class FindJwtTokenService {
  public constructor(private readonly consensusGateway: IConsensusGateway) {}

  private getFirstActiveToken(jwtTokens: IJwtToken[]) {
    const sortedTokens = jwtTokens.sort(
      (a, b) => Number(a.expires_at) - Number(b.expires_at),
    );

    const firstActiveToken = sortedTokens.find(
      token => Number(token.expires_at) * DATE_MULTIPLIER > Date.now(),
    );

    return firstActiveToken || sortedTokens[sortedTokens.length - 1];
  }

  public async getAllIssuedJwtTokens(user: Web3Address) {
    const jwtTokensResponse = await this.consensusGateway.getJwtTokens(user);

    if (!jwtTokensResponse || jwtTokensResponse?.[0].length === 0) {
      return undefined;
    }

    const [jwtTokens] = jwtTokensResponse;

    return jwtTokens;
  }

  public async findIssuedToken(user: Web3Address) {
    const tokens = await this.getAllIssuedJwtTokens(user);

    if (!tokens) {
      return undefined;
    }

    const firstActiveToken = this.getFirstActiveToken(tokens);

    if (!firstActiveToken) {
      return undefined;
    }

    return firstActiveToken;
  }
}
