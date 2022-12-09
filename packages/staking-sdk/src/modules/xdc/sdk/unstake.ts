import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { currentEnv, ESDKErrorCodes, IStakeProps } from '../../common';
import { IUnstakeData } from '../../stake';
import { convertNumberToHex } from '../../utils';
import { XDC_SCALE_FACTOR } from '../const';

import { getXDCStakingPoolContract } from './contracts';

export const unstake = async ({
  address,
  amount,
  env = currentEnv,
  provider,
  scale = XDC_SCALE_FACTOR,
}: IStakeProps<Web3KeyReadProvider>): Promise<IUnstakeData> => {
  if (amount.isLessThanOrEqualTo(0)) {
    throw new Error(ESDKErrorCodes.ZERO_AMOUNT);
  }

  const amountHex = convertNumberToHex(amount, scale);

  const xdcStakingPoolContract = await getXDCStakingPoolContract({
    env,
    provider,
  });

  const { transactionHash: txHash }: TransactionReceipt =
    await xdcStakingPoolContract.methods.unstakeCerts(amountHex).send({
      from: address,
    });

  return {
    txHash,
  };
};
