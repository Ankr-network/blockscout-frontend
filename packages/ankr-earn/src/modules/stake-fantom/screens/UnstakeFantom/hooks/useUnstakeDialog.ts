import BigNumber from 'bignumber.js';
import { ZERO } from 'modules/common/const';
import { RoutesConfig } from 'modules/dashboard/Routes';

interface IUseUnstakeDialog {
  submitDisabled: boolean;
  isBalanceLoading: boolean;
  isLoading: boolean;
  balance: BigNumber;
  closeHref: string;
  onSubmit: () => void;
}

export const useUnstakeDialog = (
  openSuccess: () => void,
): IUseUnstakeDialog => {
  const submitDisabled = false;
  const isBalanceLoading = false;
  const isLoading = false;
  const balance = ZERO;

  const onSubmit = () => {
    openSuccess();
  };

  return {
    submitDisabled,
    isBalanceLoading,
    isLoading,
    balance,
    closeHref: RoutesConfig.dashboard.generatePath(),
    onSubmit,
  };
};
