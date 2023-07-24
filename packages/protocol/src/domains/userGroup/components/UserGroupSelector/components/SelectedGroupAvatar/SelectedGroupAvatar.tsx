import { Avatar } from 'domains/userGroup/components/Avatar';
import { PersonalIcon } from 'domains/userGroup/components/PersonalIcon';
import { getAvatarColor } from 'domains/userGroup/utils/getAvatarColor';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useSelectedGroupAvatarStyles } from './SelectedGroupAvatarStyles';

export const SelectedGroupAvatar = () => {
  const { group, index, isPersonal } = useSelectedUserGroup();

  const { classes } = useSelectedGroupAvatarStyles();

  return (
    <Avatar
      avatarColor={getAvatarColor(index)}
      className={classes.avatar}
      icon={
        isPersonal ? (
          <PersonalIcon className={classes.personalIcon} />
        ) : undefined
      }
      name={group?.groupName ?? ''}
    />
  );
};
