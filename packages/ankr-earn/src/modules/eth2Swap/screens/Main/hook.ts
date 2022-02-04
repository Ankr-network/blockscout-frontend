import { useMemo, useCallback, useState, useEffect } from 'react';
import {
  useDispatchRequest,
  useQuery,
  useMutation,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { object, number } from 'yup';

import { AvailableProviders } from 'provider/providerManager/types';
import { t } from 'modules/i18n/utils/intl';
import { FormErrors } from 'modules/common/types/FormErrors';
import { validate } from 'modules/common/utils/validation';
import {
  DECIMAL_PLACES,
  ETH_SCALE_FACTOR,
  ONE_ETH,
  ZERO,
} from 'modules/common/const';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import {
  approveAETHC,
  swapAssets,
} from 'modules/eth2Swap/actions/transactions';
import { ISwapFormPayload, IFeeAndTotal, TSwapOption } from '../../types';

export interface IEth2SwapHookProps {
  max: BigNumber;
}

export interface IEth2SwapHookData {
  swapOption: TSwapOption;
  balance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
  isDataLoading: boolean;
  isSwapLoading: boolean;
  isApproveLoading: boolean;
  fethBalance?: BigNumber;
  aethBalance?: BigNumber;
  validate: () => Promise<FormErrors<ISwapFormPayload>>;
  calculateValueWithRatio: (amount: BigNumber) => BigNumber;
  calculateFeeAndTotal: (amount: number) => IFeeAndTotal;
  handleChooseAEthB: () => void;
  handleChooseAEthC: () => void;
  handleApprove: () => void;
  handleSwap: (amount: string) => void;
}

const createSchema = ({ max }: { max: BigNumber }) =>
  object({
    amount: number()
      .typeError(t('validation.number-only'))
      .required(t('validation.required'))
      .positive(t('validation.greater-than-zero'))
      .max(max.toNumber(), t('validation.max', { value: max })),
  });

export const useEth2SwapHook = () => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading: isDataLoading } = useQuery({
    type: getEth2SwapData,
  });
  const { loading: isApproveLoading } = useMutation({ type: approveAETHC });
  const { loading: isSwapLoading } = useMutation({ type: swapAssets });

  const [swapOption, setSwapOption] = useState<TSwapOption>('aETHb');
  const balance =
    swapOption === 'aETHb' ? data?.fethBalance : data?.aethBalance;
  const ratio = useMemo(() => data?.ratio ?? ONE_ETH, [data?.ratio]);
  const allowance = useMemo(() => data?.allowance ?? ZERO, [data?.allowance]);
  const max = useMemo(() => balance ?? ZERO, [balance]);

  const schema = useMemo(() => createSchema({ max }), [max]);
  const validateHandler = useMemo(() => validate(schema), [schema]);

  const handleChooseAEthB = useCallback(() => {
    setSwapOption('aETHb');
  }, []);

  const handleChooseAEthC = useCallback(() => {
    setSwapOption('aETHc');
  }, []);

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

      if (!ratio.isZero() && swapOption === 'aETHb') {
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

  const handleValidate = useCallback(validateHandler, [validateHandler]);

  const handleApprove = useCallback(() => {
    dispatchRequest(
      approveAETHC({ providerId: AvailableProviders.ethCompatible }),
    );
  }, [dispatchRequest]);

  const handleSwap = useCallback(
    (amount: string) => {
      dispatchRequest(
        swapAssets({
          amount,
          providerId: AvailableProviders.ethCompatible,
          swapOption,
        }),
      );
    },
    [swapOption, dispatchRequest],
  );

  useEffect(() => {
    dispatchRequest(
      getEth2SwapData({
        providerId: AvailableProviders.ethCompatible,
      }),
    );
  }, [dispatchRequest]);

  return {
    ratio,
    allowance,
    balance: max,
    aethBalance: data?.aethBalance,
    fethBalance: data?.fethBalance,
    isDataLoading,
    isSwapLoading,
    isApproveLoading,
    swapOption,
    validate: handleValidate,
    calculateValueWithRatio,
    calculateFeeAndTotal,
    handleChooseAEthB,
    handleChooseAEthC,
    handleApprove,
    handleSwap,
  };
};
