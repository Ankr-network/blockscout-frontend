import {
  EEthereumNetworkId,
  ITokenInfo,
  Web3KeyWriteProvider,
} from '@ankr.com/provider-core';

import {
  configFromEnv,
  currentEnv,
  Env,
  ETH_DECIMALS,
  ZERO_ADDRESS,
} from '../../../common';
import { ESSVTokens } from '../../types';
import { addTokenToWallet } from '../addTokenToWallet';

describe('modules/ethereum-ssv/sdk/addTokenToWallet', () => {
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
    test('should has a valid "tokenInfo" for an invalid token', async () => {
      const data = await addTokenToWallet({
        env: Env.Production,
        provider,
        token: '' as ESSVTokens,
      });

      expect(data).toBe(true);

      expect(tokenInfo).toStrictEqual({
        address: ZERO_ADDRESS,
        chainId: EEthereumNetworkId.mainnet,
        decimals: ETH_DECIMALS,
        symbol: '',
      } as ITokenInfo);
    });

    test('should has a valid "tokenInfo"', async () => {
      const { contractConfig } = configFromEnv(currentEnv);

      const data = await addTokenToWallet({
        provider,
        token: ESSVTokens.asETHc,
      });

      expect(data).toBe(true);

      expect(tokenInfo).toStrictEqual({
        address: contractConfig.asETHcContract,
        chainId: EEthereumNetworkId.goerli,
        decimals: ETH_DECIMALS,
        symbol: ESSVTokens.asETHc,
      } as ITokenInfo);
    });
  });
});
