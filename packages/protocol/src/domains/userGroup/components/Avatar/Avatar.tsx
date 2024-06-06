import { Box, Typography } from '@mui/material';

import { getAvatarTitle } from './AvatarUtils';
import { useAvatarStyles } from './useAvatarStyles';

interface AvatarProps {
  avatarColor: string;
  className?: string;
  icon?: JSX.Element;
  name: string;
}

export const Avatar = ({ avatarColor, className, icon, name }: AvatarProps) => {
  const { classes, cx } = useAvatarStyles(avatarColor);

  return (
    <Box className={cx(classes.root, className)}>
      {icon || (
        <Typography
          variant="body4"
          color="textPrimary"
          className={classes.avatarTitle}
        >
          {getAvatarTitle(name)}
        </Typography>
      )}
    </Box>
  );
};
