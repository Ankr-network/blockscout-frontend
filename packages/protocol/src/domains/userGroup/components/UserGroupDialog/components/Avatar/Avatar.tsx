import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { getAvatarTitle } from './AvatarUtils';
import { useAvatarStyles } from './useAvatarStyles';

interface AvatarProps {
  name: string;
  avatarColor: string;
  icon?: ReactNode;
}

export const Avatar = ({ name, icon, avatarColor }: AvatarProps) => {
  const { classes } = useAvatarStyles(avatarColor);

  return (
    <Box className={classes.root}>
      {icon || (
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.avatarTitle}
        >
          {getAvatarTitle(name)}
        </Typography>
      )}
    </Box>
  );
};
