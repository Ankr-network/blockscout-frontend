import { EventData } from 'web3-eth-contract';

import { getFilteredContractEvents } from '../getFilteredContractEvents';

describe('modules/stake/getFilteredContractEvents', () => {
  test('should return filtered events', () => {
    const events = [
      { returnValues: { isRebasing: true } },
      { returnValues: { isRebasing: false } },
    ];

    const { bondEvents, certEvents } = getFilteredContractEvents(
      events as unknown as EventData[],
    );

    expect(bondEvents).toHaveLength(1);
    expect(certEvents).toHaveLength(1);
  });
});
