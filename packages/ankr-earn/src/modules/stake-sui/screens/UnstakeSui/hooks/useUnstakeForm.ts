import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useGetSUICommonDataQuery } from 'modules/stake-sui/actions/getCommonData';
import { useUnstakeSUIMutation } from 'modules/stake-sui/actions/unstake';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';

interface IUseUnstakeForm {
  syntTokenBalance?: BigNumber;
  minAmount: BigNumber;
  isCommonDataLoading: boolean;
  isUnstakeLoading: boolean;
  closeHref: string;
  onExtraValidation: (
    values: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ) => FormErrors<IUnstakeFormValues>;
  onUnstakeSubmit: (values: IUnstakeFormValues) => void;
  calcTotalRecieve: (amount: BigNumber) => string;
}

export const useUnstakeForm = (): IUseUnstakeForm => {
  const [unstake, { isLoading: isUnstakeLoading }] = useUnstakeSUIMutation();

  const { data, isFetching: isCommonDataLoading } = useGetSUICommonDataQuery(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );

  const onUnstakeSubmit = useCallback(
    ({ amount }: IUnstakeFormValues) => {
      if (!amount) {
        return;
      }

      const resultAmount = new BigNumber(amount);

      unstake({
        amount: resultAmount,
      });
    },
    [unstake],
  );

  return {
    syntTokenBalance: data?.aSUIcBalance ?? ZERO,
    minAmount: data?.minStake ?? ZERO,
    isCommonDataLoading,
    isUnstakeLoading,
    closeHref: DashboardRoutes.dashboard.generatePath(),
    onExtraValidation: () => ({ amount: ' ' }),
    onUnstakeSubmit,
    calcTotalRecieve: () => ' ',
  };
};
