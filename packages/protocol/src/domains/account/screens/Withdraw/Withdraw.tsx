import { useWithdrawBreadcrumbs } from './WithdrawUtils';
import { WithdrawDisabled } from './WithdrawDisabled';

export const Withdraw = () => {
  useWithdrawBreadcrumbs();

  return <WithdrawDisabled />;
};
