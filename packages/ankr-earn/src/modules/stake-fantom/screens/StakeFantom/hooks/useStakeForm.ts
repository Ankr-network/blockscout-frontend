import BigNumber from 'bignumber.js';
import { t } from 'modules/i18n/utils/intl';
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
  tokenIn?: string;
  tokenOut?: string;
  amount: ReactText;
  onSubmit: (payload: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload) => void;
}

export const useStakeForm = (): IUseStakeForm => {
  const [amount, setAmount] = useState<ReactText>('');

  // todo: onSubmit
  const onSubmit = () => null;

  // todo: get actual data
  const balance = new BigNumber(0);

  const onChange = (values: IStakeFormPayload) => {
    setAmount(values.amount || '');
  };

  // todo: get it from the contract
  const minAmount = 1;

  return {
    onSubmit,
    balance,
    stakingAmountStep: FANTOM_STAKING_AMOUNT_STEP,
    minAmount,
    // todo: loading
    loading: false,
    tokenIn: t('unit.ftm'),
    tokenOut: t('unit.aftmb'),
    onChange,
    amount,
  };
};
