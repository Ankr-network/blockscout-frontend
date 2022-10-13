import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { Address } from '@ankr.com/provider';

import { currentEnv, ETH_SCALE_FACTOR, ZERO } from '../../common';
import { IStakeData } from '../../stake';
import { convertNumberToHex } from '../../utils';
import { SSV_GAS_FEE_MULTIPLIER } from '../const';
import { ESDKErrorCodes, ICommonProps } from '../types';

import { getETHBalance } from './balances';
import { getSSVStakingPoolContract } from './contracts';
import { getIncreasedGasLimit } from './getIncreasedGasLimit';
import { getMinStakeAmount } from './getMinStakeAmount';
import { getStakeGasFee } from './getStakeGasFee';
import { isValidAmount } from './utils';
import { Web3KeyReadProvider } from 'common';

interface IStakeProps extends ICommonProps<Web3KeyReadProvider> {
  address: Address;
  amount: BigNumber;
  scale?: number;
}

export const stake = async ({
  address,
  amount,
  env = currentEnv,
  provider,
  scale = ETH_SCALE_FACTOR,
}: IStakeProps): Promise<IStakeData> => {
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

  const [ethBalance, gasFee, gasPrice, ssvStakingPoolContract] =
    await Promise.all([
      getETHBalance({
        address,
        provider,
      }),
      getStakeGasFee({
        address,
        amount,
        env,
        provider,
        scale,
      }),
      provider.getSafeGasPriceWei(),
      getSSVStakingPoolContract({
        env,
        provider,
      }),
    ]);

  const multipliedGasFee = gasFee.multipliedBy(SSV_GAS_FEE_MULTIPLIER);

  const maxAllowedAmount = ethBalance.minus(multipliedGasFee);

  if (maxAllowedAmount.isLessThanOrEqualTo(ZERO)) {
    throw new Error(ESDKErrorCodes.INSUFFICIENT_BALANCE);
  }

  const stakeAmount = amount.isGreaterThan(maxAllowedAmount)
    ? maxAllowedAmount
    : amount;

  const amountHex = convertNumberToHex(stakeAmount, scale);

  const contractMethod = ssvStakingPoolContract.methods.stakeCerts();

  const gasLimit: number = await contractMethod.estimateGas({
    from: address,
    value: amountHex,
  });

  const { transactionHash: txHash }: TransactionReceipt =
    await contractMethod.send({
      from: address,
      gas: getIncreasedGasLimit(gasLimit),
      gasPrice: gasPrice.toString(10),
      value: amountHex,
    });

  return {
    txHash,
  };
};
