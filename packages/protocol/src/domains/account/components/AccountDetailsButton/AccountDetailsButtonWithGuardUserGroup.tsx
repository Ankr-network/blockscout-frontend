import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import {
  AccountDetailsButton,
  AccountDetailsButtonProps,
} from './AccountDetailsButton';

export const AccountDetailsButtonWithGuardUserGroup = (
  props: AccountDetailsButtonProps,
) => {
  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing}>
      <AccountDetailsButton {...props} />
    </GuardUserGroup>
  );
};
