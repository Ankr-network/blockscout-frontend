import { EPolkadotNetworks } from '../../types';
import { getPolkadotStakingNetworks } from '../getPolkadotStakingNetworks';

describe('modules/stake-polkadot/utils/getPolkadotStakingNetworks', (): void => {
  it('Should be invalid', (): void => {
    const INVALID_INPUT_DATA = [
      undefined,
      null,
      1,
      -1,
      [],
      {},
      '',
      'TEST',
      'ROC',
      EPolkadotNetworks.DOT.toLowerCase(),
      EPolkadotNetworks.KSM.toLowerCase(),
      EPolkadotNetworks.WND.toLowerCase(),
    ];

    INVALID_INPUT_DATA.forEach((currNetwork): void => {
      const result = getPolkadotStakingNetworks(currNetwork);

      expect(result).toStrictEqual(null);
    });
  });

  it('Should be valid', (): void => {
    const VALID_INPUT_DATA = [
      EPolkadotNetworks.DOT,
      EPolkadotNetworks.KSM,
      EPolkadotNetworks.WND,
    ];

    VALID_INPUT_DATA.forEach((currNetwork): void => {
      const result = getPolkadotStakingNetworks(currNetwork);

      expect(result).toStrictEqual([currNetwork]);
    });
  });
});
