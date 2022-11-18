import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';

interface IUseUnstakeForm {
  syntTokenBalance?: BigNumber;
  minAmount: BigNumber;
  isFetchStatsLoading: boolean;
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
  return {
    syntTokenBalance: ZERO,
    minAmount: ZERO,
    isFetchStatsLoading: false,
    isUnstakeLoading: false,
    closeHref: DashboardRoutes.dashboard.generatePath(),
    onExtraValidation: () => ({ amount: ' ' }),
    onUnstakeSubmit: () => null,
    calcTotalRecieve: () => ' ',
  };
};
