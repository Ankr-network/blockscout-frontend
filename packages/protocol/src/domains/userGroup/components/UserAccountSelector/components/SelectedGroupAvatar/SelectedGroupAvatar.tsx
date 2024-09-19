import { t } from '@ankr.com/common';

import { Avatar } from 'domains/userGroup/components/Avatar';
import { getAvatarColor } from 'modules/groups/utils/getAvatarColor';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useSelectedGroupAvatarStyles } from './SelectedGroupAvatarStyles';

export const SelectedGroupAvatar = () => {
  const { group, index } = useSelectedUserGroup();

  const { classes } = useSelectedGroupAvatarStyles();

  return (
    <Avatar
      avatarColor={getAvatarColor(group?.index || index)}
      className={classes.avatar}
      name={group?.name || t('teams.personal-account')[0]}
    />
  );
};
