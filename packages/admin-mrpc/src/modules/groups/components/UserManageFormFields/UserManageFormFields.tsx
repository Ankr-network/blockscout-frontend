import { UserRoleSelect, UserSelectProps } from '../UserRoleSelect';
import { UserAddressField } from './UserAddressField';
import { GroupAddressField } from './GroupAddressField';

export const UserManageFormFields = ({
  role,
  handleSelectRole,
}: UserSelectProps) => {
  return (
    <>
      <UserRoleSelect role={role} handleSelectRole={handleSelectRole} />

      <GroupAddressField />
      <UserAddressField />
    </>
  );
};
