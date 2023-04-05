import { Avatar } from '@ankr.com/ui';

import { usePersonalIconStyles } from './PersonalIconStyles';

export interface PersonalIconProps {
  className?: string;
}

export const PersonalIcon = ({ className }: PersonalIconProps) => {
  const { classes, cx } = usePersonalIconStyles();

  return <Avatar className={cx(classes.root, className)} />;
};
