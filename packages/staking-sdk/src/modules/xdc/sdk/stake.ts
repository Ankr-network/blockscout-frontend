import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { currentEnv, ESDKErrorCodes, IStakeProps } from '../../common';
import { IStakeData } from '../../stake';
import { convertNumberToHex } from '../../utils';
import { XDC_SCALE_FACTOR } from '../const';

import { getXDCStakingPoolContract } from './contracts';
import { getMinStakeAmount } from './getMinStakeAmount';
import { isValidStakeAmount } from './utils';

/**
 * Stake XDC token.
 *
 * @param {string} address - current user address
 * @param {BigNumber} amount - amount for stake
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @param {number | undefined} [scale = XDC_SCALE_FACTOR] - scale factor for amount
 * @returns {Promise<IStakeData>}
 */
export const stake = async ({
  address,
  amount,
  env = currentEnv,
  provider,
  scale = XDC_SCALE_FACTOR,
}: IStakeProps<Web3KeyReadProvider>): Promise<IStakeData> => {
  const minStakeAmount = await getMinStakeAmount({
    env,
    provider,
  });

  const isInvalidAmount = !isValidStakeAmount({
    amount,
    minStakeAmount,
  });

  if (isInvalidAmount) {
    throw new Error(ESDKErrorCodes.INVALID_AMOUNT);
  }

  const amountHex = convertNumberToHex(amount, scale);

  const xdcStakingPoolContract = await getXDCStakingPoolContract({
    env,
    provider,
  });

  const { transactionHash: txHash }: TransactionReceipt =
    await xdcStakingPoolContract.methods.stakeCerts().send({
      from: address,
      value: amountHex,
    });

  return {
    txHash,
  };
};
