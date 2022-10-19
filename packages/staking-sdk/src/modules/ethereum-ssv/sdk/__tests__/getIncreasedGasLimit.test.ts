import { getIncreasedGasLimit } from '../getIncreasedGasLimit';

describe('modules/ethereum-ssv/sdk/getIncreasedGasLimit', () => {
  test('should return data for "getIncreasedGasLimit"', () => {
    const data = [
      getIncreasedGasLimit(-1),
      getIncreasedGasLimit(-0.5),
      getIncreasedGasLimit(0),
      getIncreasedGasLimit(0.5),
      getIncreasedGasLimit(1),
      getIncreasedGasLimit(1.3),
      getIncreasedGasLimit(1.5),
      getIncreasedGasLimit(1.7),
    ];

    expect(data).toStrictEqual([0, 0, 0, 1, 1, 1, 2, 2]);
  });
});
