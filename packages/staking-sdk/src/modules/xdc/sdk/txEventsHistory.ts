import { BlockTransactionObject } from 'web3-eth';
import { EventData } from 'web3-eth-contract';

import { TWeb3BatchCallback, Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3PastEventsFromBlockchainByRange,
  getWeb3ReadableAmountFromWei,
  ITxEventsHistoryRangeProps,
  IWeb3TxEventsHistoryGroupProps,
} from '../../common';
import {
  getFilteredContractEvents,
  ITxEventsHistoryData,
  ITxEventsHistoryGroupItem,
  ITxHistoryEventData,
} from '../../stake';
import { XDC_BLOCK_1_DAY_RANGE } from '../const';
import { EXDCStakingPoolEvents } from '../types';

import { getXDCStakingPoolContract } from './contracts';
import { getPendingUnstakesAmount } from './getPendingUnstakesAmount';

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
  ITxEventsHistoryGroupItem[]
> => {
  if (!Array.isArray(rawEvents) || !rawEvents.length) {
    return [];
  }

  const web3 = provider.getWeb3();

  const calls = rawEvents.map(
    event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
      web3.eth.getBlock.request(event.blockNumber, false, callback),
  );

  const blocks = await provider.executeBatchCalls<BlockTransactionObject>(
    calls,
  );

  const rawData: ITxHistoryEventData[] = blocks.map((block, index) => ({
    ...rawEvents[index],
    timestamp: block.timestamp as number,
  }));

  return rawData
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ event, returnValues: { shares }, timestamp, transactionHash }) => ({
      txAmount: getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
        amount: shares,
        provider,
      }),
      txDate: new Date(timestamp * 1_000),
      txHash: transactionHash,
      txType: event ?? null,
    }));
};

/**
 * Get transaction history for block range.
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
