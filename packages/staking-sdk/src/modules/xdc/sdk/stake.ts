import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { currentEnv, ESDKErrorCodes, IStakeProps } from '../../common';
import { IStakeData } from '../../stake';
import { convertNumberToHex } from '../../utils';
import { XDC_SCALE_FACTOR } from '../const';

import { getXDCStakingPoolContract } from './contracts';
import { getMinStakeAmount } from './getMinStakeAmount';
import { isValidAmount } from './utils';

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

  const isInvalidAmount = !isValidAmount({
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
