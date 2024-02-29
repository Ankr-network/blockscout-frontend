import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import { BalanceButton, IBalanceButtonProps } from './BalanceButton';

export const BalanceButtonWithGuardUserGroup = (props: IBalanceButtonProps) => {
  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing}>
      <BalanceButton {...props} />
    </GuardUserGroup>
  );
};
