import { Box, Typography } from '@mui/material';

import { useUserDataStyles } from './useUserDataStyles';

interface UserDataProps {
  title?: string;
  subtitle?: string;
}

export const UserData = ({ subtitle, title }: UserDataProps) => {
  const { classes } = useUserDataStyles();

  return (
    <Box className={classes.root}>
      {title && (
        <Typography
          component="p"
          noWrap
          className={classes.title}
          variant="body2"
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          noWrap
          variant="subtitle1"
          color="textSecondary"
          className={classes.subtitle}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
