import { EventData } from 'web3-eth-contract';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3PastEventsFromBlockchainByRange,
  getWeb3ReadableAmountFromWei,
  ITxEventsHistoryRangeProps,
  IWeb3TxEventsHistoryGroupProps,
} from '../../common';
import { GetBlocksManager } from '../../common/GetBlocksManager';
import {
  getFilteredContractEvents,
  ITxEventsHistoryData,
  ITxHistory,
  ITxHistoryEventData,
  ITxHistoryItem,
} from '../../stake';
import { XDC_BLOCK_1_DAY_RANGE } from '../const';
import { EXDCStakingPoolEvents } from '../types';

import { getXDCStakingPoolContract } from './contracts';
import { getPendingUnstakesAmount } from './getPendingUnstakesAmount';

const blockManager = new GetBlocksManager();

/**
 * Get transaction history group from events.
 *
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @param {EventData[] | undefined} rawEvents - events
 * @returns {Promise<ITxEventsHistoryGroupItem[]>}
 */
export const getTxEventsHistoryGroup = async ({
  provider,
  rawEvents,
}: IWeb3TxEventsHistoryGroupProps<Web3KeyReadProvider>): Promise<
  ITxHistoryItem[]
> => {
  if (!Array.isArray(rawEvents) || !rawEvents.length) {
    return [];
  }

  const web3 = provider.getWeb3();

  const blockNumbers = rawEvents.map(event => event.blockNumber);

  const blocks = await blockManager.getBlocks(web3, blockNumbers);

  const rawData: ITxHistoryEventData[] = blocks.map((block, index) => ({
    ...rawEvents[index],
    timestamp: block.timestamp as number,
  }));

  return rawData
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ event, returnValues, timestamp, transactionHash }) => ({
      txAmount: getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
        amount: returnValues.shares,
        provider,
      }),
      txDate: new Date(timestamp * 1_000),
      txHash: transactionHash,
      txType: event ?? null,
      isBond: returnValues.isRebasing,
    }));
};

/**
 * Get transaction history for block range.
 *
 * @deprecated use `getTxHistoryRange` instead
 *
 * @param {string} address - current user address
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {number} from - from block number
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @param {number} to - to block number
 * @returns {Promise<ITxEventsHistoryData>}
 */
export const getTxEventsHistoryRange = async ({
  address,
  env = currentEnv,
  from,
  provider,
  to,
}: ITxEventsHistoryRangeProps<Web3KeyReadProvider>): Promise<ITxEventsHistoryData> => {
  const xdcStakingPoolContract = getXDCStakingPoolContract({
    env,
    provider,
  });

  const [stakeRawEvents, unstakeRawEvents] = await Promise.all([
    getWeb3PastEventsFromBlockchainByRange({
      contract: xdcStakingPoolContract,
      eventName: EXDCStakingPoolEvents.Staked,
      filter: {
        staker: address,
      },
      latestBlockNumber: to,
      provider,
      rangeStep: XDC_BLOCK_1_DAY_RANGE,
      startBlock: from,
    }),
    getWeb3PastEventsFromBlockchainByRange({
      contract: xdcStakingPoolContract,
      eventName: EXDCStakingPoolEvents.Unstaked,
      filter: {
        ownerAddress: address,
        receiverAddress: address,
      },
      latestBlockNumber: to,
      provider,
      rangeStep: XDC_BLOCK_1_DAY_RANGE,
      startBlock: from,
    }),
  ]);

  let completedUnstakeRawEvents: EventData[];
  let pendingRawEvents: EventData[] = [];

  let pendingUnstakesAmount = await getPendingUnstakesAmount({
    address,
    env,
    provider,
  });

  if (pendingUnstakesAmount.isGreaterThan(0)) {
    const unstakeRawEventsReverse: EventData[] = unstakeRawEvents.reverse();

    for (
      let i = 0;
      i < unstakeRawEventsReverse.length && !pendingUnstakesAmount.isZero();
      i += 1
    ) {
      const unstakeRawEventItem = unstakeRawEventsReverse[i];

      const itemAmount = getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
        amount: unstakeRawEventItem.returnValues.shares,
        provider,
      });

      pendingUnstakesAmount = pendingUnstakesAmount.minus(itemAmount);

      pendingRawEvents = [...pendingRawEvents, unstakeRawEventItem];
    }

    completedUnstakeRawEvents = [
      ...unstakeRawEventsReverse.slice(pendingRawEvents.length),
    ];
  } else {
    completedUnstakeRawEvents = [...unstakeRawEvents];
  }

  const [
    { certEvents: unstakeCertificateEvents },
    { certEvents: pendingCertificateEvents },
    { certEvents: completedCertificateEvents },
  ] = [completedUnstakeRawEvents, pendingRawEvents, stakeRawEvents].map(
    events => getFilteredContractEvents(events),
  );

  const [completedCertificate, pendingCertificate, unstakeCertificate] =
    await Promise.all(
      [
        completedCertificateEvents,
        pendingCertificateEvents,
        unstakeCertificateEvents,
      ].map(rawEvents =>
        getTxEventsHistoryGroup({
          provider,
          rawEvents,
        }),
      ),
    );

  return {
    completedBond: [],
    completedCertificate,
    pendingBond: [],
    pendingCertificate,
    unstakeBond: [],
    unstakeCertificate,
  };
};

/**
 * Get transaction history for block range.
 *
 * @param {string} address - current user address
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {number} from - from block number
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @param {number} to - to block number
 * @param {boolean | undefined} isUnstakeOnly - if true, only unstake events will be returned
 * @returns {Promise<ITxEventsHistoryData>}
 */
export const getTxHistoryRange = async ({
  address,
  env = currentEnv,
  from,
  provider,
  to,
  isUnstakeOnly = false,
}: ITxEventsHistoryRangeProps<Web3KeyReadProvider>): Promise<ITxHistory> => {
  const xdcStakingPoolContract = getXDCStakingPoolContract({
    env,
    provider,
  });

  const unstakeRawEvents = await getWeb3PastEventsFromBlockchainByRange({
    contract: xdcStakingPoolContract,
    eventName: EXDCStakingPoolEvents.Unstaked,
    filter: {
      ownerAddress: address,
      receiverAddress: address,
    },
    latestBlockNumber: to,
    provider,
    rangeStep: XDC_BLOCK_1_DAY_RANGE,
    startBlock: from,
  });

  const unstakeHistory = await getTxEventsHistoryGroup({
    provider,
    rawEvents: unstakeRawEvents,
  });

  if (isUnstakeOnly) {
    return {
      stakeHistory: [],
      unstakeHistory,
    };
  }

  const stakeRawEvents = await getWeb3PastEventsFromBlockchainByRange({
    contract: xdcStakingPoolContract,
    eventName: EXDCStakingPoolEvents.Staked,
    filter: {
      staker: address,
    },
    latestBlockNumber: to,
    provider,
    rangeStep: XDC_BLOCK_1_DAY_RANGE,
    startBlock: from,
  });

  const stakeHistory = await getTxEventsHistoryGroup({
    provider,
    rawEvents: stakeRawEvents,
  });

  return {
    stakeHistory,
    unstakeHistory,
  };
};
