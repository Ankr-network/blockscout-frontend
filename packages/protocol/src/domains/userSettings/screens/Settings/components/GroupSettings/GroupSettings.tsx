import { PERSONAL_GROUP_NAME } from 'domains/userGroup/constants/groups';
import { selectUserGroups } from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';

import { Role } from '../Role';

export const GroupSettings = () => {
  const groups = useAppSelector(selectUserGroups);

  return (
    <>
      {groups
        .filter(item => item.groupName !== PERSONAL_GROUP_NAME)
        .map(group => (
          <Role
            key={group.groupAddress}
            team={group.groupName}
            role={group.userRole}
          />
        ))}
    </>
  );
};
