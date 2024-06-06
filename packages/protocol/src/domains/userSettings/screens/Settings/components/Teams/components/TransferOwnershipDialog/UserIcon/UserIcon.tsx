import { Typography } from '@mui/material';

import { useUserIconStyles } from './useUserIconStyles';

interface IUserIconProps {
  userName: string;
  className?: string;
}

export const UserIcon = ({ className, userName }: IUserIconProps) => {
  const { classes, cx } = useUserIconStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Typography variant="caption" color="textPrimary">
        {userName.substring(0, 1).toUpperCase()}
      </Typography>
    </div>
  );
};
