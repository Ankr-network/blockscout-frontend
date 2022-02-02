import { ProviderManager } from 'provider';
import { AvailableProviders } from 'provider/providerManager/types';
import { ZERO_ADDR } from 'modules/common/const';
import { fetchEth2SwapData } from '../sdk';

describe('ankr-earn/src/modules/eth2Swap/api/sdk', () => {
  test('should return contracts data', async () => {
    const mockBalanceOf = jest.fn().mockReturnValue({ call: () => 1 });
    const mockRatio = jest.fn().mockReturnValue({ call: () => 0 });

    const mockProviderManager = {
      getProvider: () => ({
        currentAccount: ZERO_ADDR,
        createContract: () => ({
          methods: {
            balanceOf: mockBalanceOf,
            ratio: mockRatio,
          },
        }),
      }),
    };

    const { ratio, aethBalance, fethBalance } = await fetchEth2SwapData({
      providerManager: mockProviderManager as unknown as ProviderManager,
      providerId: AvailableProviders.ethCompatible,
    });

    expect(ratio.toNumber()).toBe(0);
    expect(aethBalance.toNumber()).toBe(1);
    expect(fethBalance.toNumber()).toBe(1);
    expect(mockBalanceOf).toBeCalledTimes(2);
    expect(mockRatio).toBeCalledTimes(1);
  });
});
