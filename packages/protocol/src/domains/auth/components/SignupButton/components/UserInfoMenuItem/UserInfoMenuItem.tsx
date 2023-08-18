import { Box, MenuItem } from '@mui/material';
import { ReactNode } from 'react';

import { OauthProviderType } from 'domains/auth/store/authSlice';

import { useUserInfoMenuItemStyles } from './useUserInfoMenuItemStyles';
import { UserLogo } from './components/UserLogo';
import { UserData } from './components/UserData';

interface UserInfoMenuItemProps {
  signoutButton: ReactNode;
  isLoading: boolean;
  providers?: OauthProviderType[];
  icon: ReactNode;
  title?: string;
  subtitle?: string;
}

export const UserInfoMenuItem = ({
  isLoading,
  signoutButton,
  providers,
  icon,
  title,
  subtitle,
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
