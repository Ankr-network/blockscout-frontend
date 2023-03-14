import { decryptJwt } from 'domains/auth/actions/instantJwt/utils/decryptJwt';
import { IJwtTokenResponse } from 'multirpc-sdk';
import { JwtManagerToken } from '../store/jwtTokenManagerSlice';
import { PRIMARY_TOKEN_INDEX } from '../utils/utils';

const DECRYPTED_TOKENS: Record<string, string> = {};

const getUserEndpointToken = async (jwtData: string, isEncrypted: boolean) => {
  if (DECRYPTED_TOKENS[jwtData]) {
    return DECRYPTED_TOKENS[jwtData];
  }

  const jwtTokenData = await decryptJwt(jwtData, isEncrypted);

  const userEndpointToken =
    jwtTokenData?.workerTokenData?.userEndpointToken ?? '';

  DECRYPTED_TOKENS[jwtData] = userEndpointToken;

  return userEndpointToken;
};

export const formatTokenAndDecryptJwt = async (
  item: IJwtTokenResponse,
  primaryUserEndpointToken = '',
): Promise<JwtManagerToken> => {
  const { index, jwt_data: jwtData, is_encrypted: isEncrypted } = item;

  if (index === PRIMARY_TOKEN_INDEX) {
    return {
      index,
      userEndpointToken: primaryUserEndpointToken,
      jwtData,
    };
  }

  const userEndpointToken = await getUserEndpointToken(jwtData, isEncrypted);

  return {
    index,
    userEndpointToken,
    jwtData,
  };
};

export const formatJwtTokensAndDecrypt = async (
  tokens: IJwtTokenResponse[],
  primaryUserEndpointToken?: string,
): Promise<JwtManagerToken[]> => {
  return Promise.all(
    tokens.map(async item =>
      formatTokenAndDecryptJwt(item, primaryUserEndpointToken),
    ),
  );
};
