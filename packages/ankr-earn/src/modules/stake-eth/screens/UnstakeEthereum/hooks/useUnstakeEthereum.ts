import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { ZERO } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { useUnstakeEthMutation } from 'modules/stake-eth/actions/unstakeEth';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { TEthSyntToken } from 'modules/stake-eth/types';
import { getValidSelectedToken } from 'modules/stake-eth/utils/getValidSelectedToken';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';

interface IUseUnstakeEthereum {
  balance: BigNumber;
  token: TEthSyntToken;
  isBalanceLoading: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  onSubmit: (values: IUnstakeFormValues) => void;
  calcTotalRecieve: (amount: BigNumber) => BigNumber;
}

export const useUnstakeEthereum = (): IUseUnstakeEthereum => {
  const { data: commonData, isFetching: isBalanceLoading } =
    useGetETHCommonDataQuery();

  const [unstake, { isLoading: isUnstakeLoading }] = useUnstakeEthMutation();

  const stakeParamsToken = RoutesConfig.unstake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const isBondToken = selectedToken === Token.aETHb;

  const syntTokenBalance = isBondToken
    ? commonData?.aETHbBalance || ZERO
    : commonData?.aETHcBalance || ZERO;

  const calcTotalRecieve = useCallback(
    (amount: BigNumber) =>
      isBondToken ? amount : amount.dividedBy(commonData?.aETHcRatio || ZERO),
    [commonData?.aETHcRatio, isBondToken],
  );

  const onSubmit = useCallback(
    ({ amount: formAmount }: IUnstakeFormValues) => {
      if (!formAmount) {
        return;
      }

      const amount = new BigNumber(formAmount);

      // todo: STAKAN-2608 add analytics
      unstake({ amount, token: selectedToken });
    },
    [selectedToken, unstake],
  );

  return {
    balance: syntTokenBalance,
    isLoading: isUnstakeLoading,
    isDisabled: isUnstakeLoading,
    token: selectedToken,
    isBalanceLoading,
    onSubmit,
    calcTotalRecieve,
  };
};
