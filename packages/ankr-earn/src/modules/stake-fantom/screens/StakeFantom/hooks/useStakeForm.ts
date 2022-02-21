import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { t } from 'modules/i18n/utils/intl';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { FANTOM_STAKING_AMOUNT_STEP } from 'modules/stake-fantom/const';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { ReactText, useState } from 'react';

interface IUseStakeForm {
  balance?: BigNumber;
  stakingAmountStep: number;
  minAmount?: number;
  loading: boolean;
  isCommonDataLoading: boolean;
  tokenIn: string;
  tokenOut: string;
  amount: ReactText;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload) => void;
}

export const useStakeForm = (openSuccessModal: () => void): IUseStakeForm => {
  const [amount, setAmount] = useState<ReactText>('');
  const dispatchRequest = useDispatchRequest();
  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const balance = data?.ftmBalance;
  const minAmount = data?.minStake.toNumber() ?? 0;

  const onChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

  const onSubmit = () => {
    const stakeAmount = new BigNumber(amount);

    dispatchRequest(stake(stakeAmount)).then(({ error }) => {
      if (!error) {
        openSuccessModal();
      }
    });
  };

  return {
    isCommonDataLoading,
    balance,
    stakingAmountStep: FANTOM_STAKING_AMOUNT_STEP,
    minAmount,
    loading: isStakeLoading,
    tokenIn: t('unit.ftm'),
    tokenOut: t('unit.aftmb'),
    amount,
    onChange,
    onSubmit,
  };
};
