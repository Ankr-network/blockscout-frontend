import { Box, MenuItem } from '@mui/material';
import { ReactNode } from 'react';
import { OauthLoginProvider } from 'multirpc-sdk';

import { useUserInfoMenuItemStyles } from './useUserInfoMenuItemStyles';
import { UserLogo } from './components/UserLogo';
import { UserData } from './components/UserData';

interface UserInfoMenuItemProps {
  signoutButton: ReactNode;
  isLoading: boolean;
  providers?: OauthLoginProvider[];
  icon: ReactNode;
  title?: string;
  subtitle?: string;
}

export const UserInfoMenuItem = ({
  icon,
  isLoading,
  providers,
  signoutButton,
  subtitle,
  title,
}: UserInfoMenuItemProps) => {
  const { classes } = useUserInfoMenuItemStyles();

  return (
    <MenuItem disabled={isLoading} className={classes.root}>
      <Box className={classes.left}>
        <UserLogo providers={providers}>{icon}</UserLogo>
        <UserData title={title} subtitle={subtitle} />
      </Box>
      {signoutButton}
    </MenuItem>
  );
};
