import { generateLogId } from '../generateLogId';

describe('modules/api/getPastEvents/utils/generateLogId', () => {
  test('should generate ID properly', () => {
    const result = generateLogId({
      blockHash:
        '0xcec41c2f0a6df2e1dfec9a8d1be2d2f73439560f74c40f40feb2f31db8524f29',
      logIndex: '0x5',
      transactionHash:
        '0xf166d67020bd2db2250c123757f6617c07514a7b4720a5dc42d5ea8662130f68',
    });

    expect(result).toBe('log_fdce18b4');
  });
});
