import { useWithdrawBreadcrumbs } from './WithdrawUtils';
import { WithdrawQuery } from './WithdrawQuery';
import { WithdrawDisabled } from './WithdrawDisabled';

const IS_WITHDRAWAL_DISABLED = true;

export const WithdrawContainer = () => {
  useWithdrawBreadcrumbs();

  return IS_WITHDRAWAL_DISABLED ? <WithdrawDisabled /> : <WithdrawQuery />;
};
