import {
  EEthereumNetworkId,
  ITokenInfo,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { configFromEnv, currentEnv, Env } from '../../../common';
import { XDC_DECIMALS } from '../../const';
import { EXDCTokens } from '../../types';
import { addTokenToWallet } from '../addTokenToWallet';

describe('modules/xdc/sdk/addTokenToWallet', () => {
  let tokenInfo = {};

  const provider = {
    addTokenToWallet: async (data: ITokenInfo) => {
      tokenInfo = data;

      return true;
    },
  } as unknown as Web3KeyWriteProvider;

  beforeEach(() => {
    tokenInfo = {};
  });

  afterEach(() => {
    tokenInfo = {};
  });

  describe('should add token', () => {
    test('should has a valid "tokenInfo" for default state', async () => {
      const { xdcConfig } = configFromEnv(currentEnv);

      const data = await addTokenToWallet({
        provider,
      });

      expect(data).toBe(true);

      expect(tokenInfo).toStrictEqual({
        address: xdcConfig.ankrXDCToken,
        chainId: EEthereumNetworkId.xdcTestnet,
        decimals: XDC_DECIMALS,
        symbol: EXDCTokens.ankrXDC,
      } as ITokenInfo);
    });

    test('should has a valid "tokenInfo" for Testnet', async () => {
      const { xdcConfig } = configFromEnv(Env.Develop);

      const data = await addTokenToWallet({
        chainId: EEthereumNetworkId.xdcTestnet,
        env: Env.Develop,
        provider,
      });

      expect(data).toBe(true);

      expect(tokenInfo).toStrictEqual({
        address: xdcConfig.ankrXDCToken,
        chainId: EEthereumNetworkId.xdcTestnet,
        decimals: XDC_DECIMALS,
        symbol: EXDCTokens.ankrXDC,
      } as ITokenInfo);
    });

    test('should has a valid "tokenInfo" for Mainnet', async () => {
      const { xdcConfig } = configFromEnv(Env.Production);

      const data = await addTokenToWallet({
        chainId: EEthereumNetworkId.xdc,
        env: Env.Production,
        provider,
      });

      expect(data).toBe(true);

      expect(tokenInfo).toStrictEqual({
        address: xdcConfig.ankrXDCToken,
        chainId: EEthereumNetworkId.xdc,
        decimals: XDC_DECIMALS,
        symbol: EXDCTokens.ankrXDC,
      } as ITokenInfo);
    });
  });
});
