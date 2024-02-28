import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import { BalanceButton, BalanceButtonProps } from './BalanceButton';

export const BalanceButtonWithGuardUserGroup = (props: BalanceButtonProps) => {
  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing}>
      <BalanceButton {...props} />
    </GuardUserGroup>
  );
};
