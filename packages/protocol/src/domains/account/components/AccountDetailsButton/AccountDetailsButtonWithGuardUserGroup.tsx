import {
  AccountDetailsButton,
  AccountDetailsButtonProps,
} from './AccountDetailsButton';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

export const AccountDetailsButtonWithGuardUserGroup = (
  props: AccountDetailsButtonProps,
) => {
  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing}>
      <AccountDetailsButton {...props} />
    </GuardUserGroup>
  );
};
