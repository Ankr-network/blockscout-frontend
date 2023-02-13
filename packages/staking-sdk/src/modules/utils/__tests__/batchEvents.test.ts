import { Contract } from 'web3-eth-contract';

import { batchEvents } from '../batchEvents';

describe('modules/utils/batchEvents', () => {

  const contract = {
    getPastEvents: jest.fn()
  } as unknown as Contract;

  test('should get full range', async () => {
    await batchEvents({
      contract,
      eventName: 'any',
      rangeStep: 10,
      startBlock: 0,
      latestBlockNumber: 67,
    });
    expect(contract.getPastEvents).toBeCalledWith('any', { fromBlock: 0, toBlock: 10 });
    expect(contract.getPastEvents).toBeCalledWith('any', { fromBlock: 10, toBlock: 20 });
    expect(contract.getPastEvents).toBeCalledWith('any', { fromBlock: 20, toBlock: 30 });
    expect(contract.getPastEvents).toBeCalledWith('any', { fromBlock: 30, toBlock: 40 });
    expect(contract.getPastEvents).toBeCalledWith('any', { fromBlock: 40, toBlock: 50 });
    expect(contract.getPastEvents).toBeCalledWith('any', { fromBlock: 50, toBlock: 60 });
    expect(contract.getPastEvents).toBeCalledWith('any', { fromBlock: 60, toBlock: 70 });
  });
});
