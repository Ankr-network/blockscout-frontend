import { Star } from '@ankr.com/ui';

import { useTeamAvatarStyles } from './useTeamAvatarStyles';

export interface TeamAvatarProps {
  className?: string;
}

export const TeamAvatar = ({ className }: TeamAvatarProps) => {
  const { classes, cx } = useTeamAvatarStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Star className={classes.icon} />
    </div>
  );
};
