import { useMemo, useCallback, useState } from 'react';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { object, number } from 'yup';

import { AvailableProviders } from 'provider/providerManager/types';
import { t } from 'modules/i18n/utils/intl';
import { TValidationHandler, validate } from 'modules/common/utils/validation';
import { DECIMAL_PLACES, ETH_SCALE_FACTOR } from 'modules/common/const';
import {
  approveAETHC,
  swapAssets,
} from 'modules/eth2Swap/actions/transactions';
import {
  IFeeAndAmount,
  IFeeAndTotal,
  TSwapOption,
} from 'modules/eth2Swap/types';

export interface IEth2SwapFormHookArgs {
  max: BigNumber;
  ratio: BigNumber;
  swapOption: TSwapOption;
}

export interface IEth2SwapFormHookData {
  txHash: string;
  txError: string;
  isApproveLoading: boolean;
  isSwapLoading: boolean;
  validate: TValidationHandler;
  calculateValueWithRatio: (amount: BigNumber) => BigNumber;
  calculateFeeAndTotal: (data: IFeeAndAmount) => IFeeAndTotal;
  handleApprove: () => void;
  handleSwap: (amount: string) => void;
  handleClearTx: () => void;
}

const createSchema = ({ max }: { max: BigNumber }) =>
  object({
    amount: number()
      .typeError(t('validation.number-only'))
      .required(t('validation.required'))
      .positive(t('validation.greater-than-zero'))
      .max(max.toNumber(), t('validation.max', { value: max })),
  });

export const useEth2SwapForm = ({
  max,
  swapOption,
  ratio,
}: IEth2SwapFormHookArgs): IEth2SwapFormHookData => {
  const dispatchRequest = useDispatchRequest();
  const { loading: isApproveLoading } = useMutation({ type: approveAETHC });
  const { loading: isSwapLoading } = useMutation({ type: swapAssets });

  const [txHash, setTxHash] = useState('');
  const [txError, setTxError] = useState('');

  const handleApprove = useCallback(() => {
    dispatchRequest(
      approveAETHC({ providerId: AvailableProviders.ethCompatible }),
    ).then(response => {
      setTxHash(response.data?.transactionHash ?? '');
      setTxError(response.error ?? '');
    });
  }, [dispatchRequest]);

  const handleSwap = useCallback(
    (amount: string) => {
      dispatchRequest(
        swapAssets({
          amount,
          ratio,
          providerId: AvailableProviders.ethCompatible,
          swapOption,
        }),
      ).then(response => {
        if (response.error) {
          setTxHash(response.data?.transactionHash ?? '');
          setTxError(response.error);
        }
      });
    },
    [swapOption, ratio, dispatchRequest],
  );

  const handleClearTx = useCallback(() => {
    setTxError('');
    setTxHash('');
  }, []);

  const schema = useMemo(() => createSchema({ max }), [max]);
  const validateHandler = useMemo(() => validate(schema), [schema]);
  const handleValidate = useCallback(validateHandler, [validateHandler]);

  const calculateFeeAndTotal = useCallback(
    ({ feeBP, amount }: { feeBP: BigNumber; amount: BigNumber }) => {
      const fee = amount.multipliedBy(feeBP).div(10_000);

      return { fee, total: amount.minus(fee) };
    },
    [],
  );

  const calculateValueWithRatio = useCallback(
    (total: BigNumber) => {
      const amount = total.multipliedBy(ETH_SCALE_FACTOR);

      if (!ratio.isZero() && swapOption === 'aETHc') {
        return amount.dividedBy(ratio).decimalPlaces(DECIMAL_PLACES);
      }

      return amount
        .multipliedBy(ratio)
        .dividedBy(ETH_SCALE_FACTOR)
        .dividedBy(ETH_SCALE_FACTOR)
        .decimalPlaces(DECIMAL_PLACES);
    },
    [ratio, swapOption],
  );

  return {
    txHash,
    txError,
    isApproveLoading,
    isSwapLoading,
    calculateFeeAndTotal,
    calculateValueWithRatio,
    validate: handleValidate,
    handleApprove,
    handleSwap,
    handleClearTx,
  };
};
