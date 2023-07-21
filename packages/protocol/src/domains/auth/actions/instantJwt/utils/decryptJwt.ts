import { JwtTokenFullData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const decryptJwt = async (
  jwtData: string,
  isEncrypted: boolean,
): Promise<JwtTokenFullData> => {
  if (isEncrypted) {
    const web3Service = await MultiService.getWeb3Service();

    const decryptedJwtToken = await web3Service.upgradeInstantJwtToken(jwtData);

    return decryptedJwtToken;
  }

  const web3ReadService = await MultiService.getWeb3ReadService();

  return web3ReadService.upgradeSyntheticJwtToken(jwtData);
};
