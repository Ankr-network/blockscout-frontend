import { Env } from 'modules/common/types';
import { configFromEnv } from '../../api/config';
import { AvailableTokens } from '../types';

const {
  contractConfig: {
    ETHContract,
    aethContract: aETHcContract,
    fethContract: aETHbContract,
    aMaticbToken,
    maticToken,
  },
} = configFromEnv(Env.Production);

export const getTokenAddr = (token: AvailableTokens): string => {
  switch (token) {
    case AvailableTokens.aETHb:
      return aETHbContract as string;

    case AvailableTokens.aETHc:
      return aETHcContract as string;

    case AvailableTokens.aMATICb:
      return aMaticbToken as string;

    case AvailableTokens.MATIC:
      return maticToken as string;

    default:
      return ETHContract as string;
  }
};
