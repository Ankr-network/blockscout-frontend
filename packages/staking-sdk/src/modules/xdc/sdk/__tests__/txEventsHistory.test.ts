import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { BlockTransactionObject } from 'web3-eth';
import { EventData } from 'web3-eth-contract';

import {
  TWeb3BatchCallback,
  TWeb3Call,
  Web3KeyReadProvider,
} from '@ankr.com/provider';

import { Env } from '../../../common';
import {
  ITxEventsHistoryData,
  ITxEventsHistoryGroupItem,
  ITxHistoryEventData,
} from '../../../stake';
import { XDC_SCALE_FACTOR } from '../../const';
import { EXDCStakingPoolEvents } from '../../types';
import {
  getTxEventsHistoryGroup,
  getTxEventsHistoryRange,
} from '../txEventsHistory';

describe('modules/xdc/sdk/txEventsHistory', () => {
  const ONE = new BigNumber(1);

  const address = 'testAddr';

  const oneBatchCall = [
    { timestamp: 1600380000 },
  ] as unknown as ITxHistoryEventData[];

  const txDate = new Date(1600380000 * 1_000);

  const txHash = 'testHash';

  describe('should return data for "getTxEventsHistoryGroup"', () => {
    test('should return empty data', async () => {
      const provider = {} as unknown as Web3KeyReadProvider;

      const data = await Promise.all([
        getTxEventsHistoryGroup({
          provider,
          rawEvents: undefined,
        }),
        getTxEventsHistoryGroup({
          provider,
          rawEvents: [],
        }),
      ]);

      expect(data).toStrictEqual([[], []] as ITxEventsHistoryGroupItem[][]);
    });

    test('should return a valid data', async () => {
      const provider = {
        executeBatchCalls: async <T>(calls: TWeb3Call<T>[]) => {
          calls.map(call => call((err, data) => err ?? data));

          return [
            { timestamp: 1600380000 },
            { timestamp: 1597442400 },
            { timestamp: 1594418400 },
            { timestamp: 1591480800 },
          ] as unknown as ITxHistoryEventData[];
        },
        getWeb3: () => ({
          eth: {
            getBlock: {
              request: (
                blockNumber: number,
                flag: boolean,
                callback: TWeb3BatchCallback<BlockTransactionObject>,
              ) => callback(null, [] as unknown as BlockTransactionObject),
            },
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const rawEvents = [
        {
          blockNumber: 4,
          event: EXDCStakingPoolEvents.Staked,
          returnValues: {
            shares: `${4 * XDC_SCALE_FACTOR}`,
          },
          transactionHash: txHash,
        },
        {
          blockNumber: 3,
          event: EXDCStakingPoolEvents.Unstaked,
          returnValues: {
            shares: `${3 * XDC_SCALE_FACTOR}`,
          },
          transactionHash: txHash,
        },
        {
          blockNumber: 2,
          event: EXDCStakingPoolEvents.PendingUnstake,
          returnValues: {
            shares: `${2 * XDC_SCALE_FACTOR}`,
          },
          transactionHash: txHash,
        },
        {
          blockNumber: 1,
          event: undefined,
          returnValues: {
            shares: `${XDC_SCALE_FACTOR}`,
          },
          transactionHash: txHash,
        },
      ] as unknown as EventData[];

      const data = await getTxEventsHistoryGroup({
        provider,
        rawEvents,
      });

      expect(data).toStrictEqual([
        {
          txAmount: new BigNumber(4),
          txDate,
          txHash,
          txType: EXDCStakingPoolEvents.Staked,
        },
        {
          txAmount: new BigNumber(3),
          txDate: new Date(1597442400 * 1_000),
          txHash,
          txType: EXDCStakingPoolEvents.Unstaked,
        },
        {
          txAmount: new BigNumber(2),
          txDate: new Date(1594418400 * 1_000),
          txHash,
          txType: EXDCStakingPoolEvents.PendingUnstake,
        },
        {
          txAmount: ONE,
          txDate: new Date(1591480800 * 1_000),
          txHash,
          txType: null,
        },
      ] as ITxEventsHistoryGroupItem[]);
    });
  });

  describe('should return data for "getTxEventsHistoryRange"', () => {
    test('should return empty data', async () => {
      const result = {
        completedBond: [],
        completedCertificate: [],
        pendingBond: [],
        pendingCertificate: [],
        unstakeBond: [],
        unstakeCertificate: [],
      } as ITxEventsHistoryData;

      const provider = {
        getWeb3: () => ({
          eth: {
            Contract: class {
              methods;

              constructor() {
                this.methods = {
                  getPendingUnstakesOf: () => ({
                    call: async () => '0',
                  }),
                };
              }

              getPastEvents() {
                return [];
              }
            },
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const data = await Promise.all([
        getTxEventsHistoryRange({
          address,
          from: 1,
          provider,
          to: 2,
        }),
        getTxEventsHistoryRange({
          address,
          env: Env.Develop,
          from: 1,
          provider,
          to: 2,
        }),
      ]);

      expect(data).toStrictEqual([result, result] as ITxEventsHistoryData[]);
    });

    test('should return "pending" data', async () => {
      const result = {
        txAmount: ONE,
        txDate,
        txHash,
        txType: EXDCStakingPoolEvents.Staked,
      } as ITxEventsHistoryGroupItem;

      const provider = {
        executeBatchCalls: async () => [...oneBatchCall],
        getWeb3: () => ({
          eth: {
            Contract: class {
              methods;

              constructor() {
                this.methods = {
                  getPendingUnstakesOf: () => ({
                    call: async () => `${XDC_SCALE_FACTOR}`,
                  }),
                };
              }

              getPastEvents() {
                return [
                  {
                    event: EXDCStakingPoolEvents.Unstaked,
                    returnValues: {
                      isRebasing: true,
                      shares: `${XDC_SCALE_FACTOR}`,
                    },
                    transactionHash: txHash,
                  },
                  {
                    event: EXDCStakingPoolEvents.Staked,
                    returnValues: {
                      isRebasing: false,
                      shares: `${XDC_SCALE_FACTOR}`,
                    },
                    transactionHash: txHash,
                  },
                ] as unknown as EventData[];
              }
            },
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const data = await getTxEventsHistoryRange({
        address,
        from: 1,
        provider,
        to: 2,
      });

      expect(data).toStrictEqual({
        completedBond: [],
        completedCertificate: [result],
        pendingBond: [],
        pendingCertificate: [result],
        unstakeBond: [],
        unstakeCertificate: [],
      } as ITxEventsHistoryData);
    });

    test('should return "unstake" data', async () => {
      const result = {
        txAmount: ONE,
        txDate,
        txHash,
        txType: EXDCStakingPoolEvents.Unstaked,
      } as ITxEventsHistoryGroupItem;

      const provider = {
        executeBatchCalls: async () => [...oneBatchCall],
        getWeb3: () => ({
          eth: {
            Contract: class {
              methods;

              constructor() {
                this.methods = {
                  getPendingUnstakesOf: () => ({
                    call: async () => '0',
                  }),
                };
              }

              getPastEvents() {
                return [
                  {
                    event: EXDCStakingPoolEvents.Unstaked,
                    returnValues: {
                      isRebasing: false,
                      shares: `${XDC_SCALE_FACTOR}`,
                    },
                    transactionHash: txHash,
                  },
                ] as unknown as EventData[];
              }
            },
          },
          utils: web3.utils,
        }),
      } as unknown as Web3KeyReadProvider;

      const data = await getTxEventsHistoryRange({
        address,
        from: 1,
        provider,
        to: 2,
      });

      expect(data).toStrictEqual({
        completedBond: [],
        completedCertificate: [result],
        pendingBond: [],
        pendingCertificate: [],
        unstakeBond: [],
        unstakeCertificate: [result],
      } as ITxEventsHistoryData);
    });
  });
});
