import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { t, tHTML } from 'common';

import { ZERO } from 'modules/common/const';
import { useFormState } from 'modules/forms/hooks/useFormState';
import { MGNO_STAKE_FORM_ID } from 'modules/stake-mgno/const';
import { RoutesConfig } from 'modules/stake-mgno/Routes';
import {
  IMgnoFormState,
  IMgnoStakeSubmitPayload,
} from 'modules/stake-mgno/types';

interface IUseMgnoStake {
  isStakeLoading: boolean;
  isBalanceLoading: boolean;
  isApproveLoading: boolean;
  isApyLoading: boolean;
  isDisabled: boolean;
  isApproved: boolean;
  balance: BigNumber;
  minStake: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerSelectHref: string;
  initialProvider?: string;
  initialAmount?: string;
  providerName?: string;
  amount: BigNumber;
  apy: BigNumber;
  quoteText: string;
  additionalText?: string;
  additionalTooltip?: string;
  additionalValue?: string;
  onSubmit: (values: IMgnoStakeSubmitPayload) => void;
  onChange?: (
    values: Partial<IMgnoStakeSubmitPayload>,
    invalid: boolean,
  ) => void;
}

export const useMgnoStake = (): IUseMgnoStake => {
  const dispatch = useDispatch();

  const { setFormState, formState } =
    useFormState<IMgnoFormState>(MGNO_STAKE_FORM_ID);

  const amount = formState?.amount;

  const initialProvider = 'test';
  const providerName = 'test';
  const apy = ZERO;

  const isApproved = false;

  const onChange = ({
    amount: formAmount,
  }: Partial<IMgnoStakeSubmitPayload>) => {
    const readyAmount = formAmount ? new BigNumber(formAmount) : undefined;
    dispatch(setFormState({ amount: readyAmount }));
  };

  const onSubmit = () => {};

  return {
    isStakeLoading: false,
    isBalanceLoading: false,
    isApproveLoading: false,
    isApyLoading: false,
    isApproved,
    isDisabled: false,
    balance: ZERO,
    minStake: ZERO,
    tokenIn: t('unit.mgno'),
    closeHref: RoutesConfig.main.generatePath(),
    providerSelectHref: 'test', // RoutesConfig.selectProvider.generatePath(),
    initialProvider,
    providerName,
    amount: amount ?? ZERO,
    initialAmount: amount?.toString(),
    apy,
    quoteText: tHTML('stake-mgno.staking.lock-info'),
    additionalText: t('stake-mgno.staking.slashing-protection'),
    additionalTooltip: t('stake-mgno.staking.slashing-protection-tooltip'),
    additionalValue: t('unit.percentage-value', {
      value: 100,
    }),
    onChange,
    onSubmit,
  };
};
