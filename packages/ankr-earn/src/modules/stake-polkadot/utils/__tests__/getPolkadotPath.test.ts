import { EPolkadotNetworks } from '../../types';
import {
  getPolkadotPath,
  IGetPolkadotPathData,
  INVALID_DEFAULT_PATH,
} from '../getPolkadotPath';

describe('modules/stake-polkadot/utils/getPolkadotPath', (): void => {
  const TARGET_PATH = '/stake/:network';

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
    ];

    const RESULT_DATA: IGetPolkadotPathData = {
      isValid: false,
      network: null,
      path: INVALID_DEFAULT_PATH,
    };

    INVALID_INPUT_DATA.forEach((currNetwork): void => {
      const result = getPolkadotPath(currNetwork, TARGET_PATH);

      expect(result).toStrictEqual(RESULT_DATA);
    });
  });

  it('Should be valid', (): void => {
    const VALID_INPUT_DATA = [
      EPolkadotNetworks.DOT,
      EPolkadotNetworks.KSM,
      EPolkadotNetworks.WND,
      EPolkadotNetworks.DOT.toLowerCase(),
      EPolkadotNetworks.KSM.toLowerCase(),
      EPolkadotNetworks.WND.toLowerCase(),
    ];

    VALID_INPUT_DATA.forEach((currNetwork): void => {
      const result = getPolkadotPath(currNetwork, TARGET_PATH);
      const resultNetwork = currNetwork.toUpperCase();
      const resultPath = `/stake/${currNetwork.toLowerCase()}`;

      expect(result).toStrictEqual({
        isValid: true,
        network: resultNetwork,
        path: resultPath,
      } as IGetPolkadotPathData);
    });
  });
});
