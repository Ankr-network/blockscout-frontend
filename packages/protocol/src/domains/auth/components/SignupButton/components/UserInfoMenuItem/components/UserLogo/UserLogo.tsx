import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { OauthLoginProvider } from 'multirpc-sdk';

import { useUserLogoStyles } from './useUserLogoStyles';
import { OauthIcon } from '../../../OauthIcon';

interface UserLogoProps {
  children: ReactNode;
  providers?: OauthLoginProvider[];
}

const INITIAL_GAP = -2;
const GAP = -7;

export const UserLogo = ({ children, providers = [] }: UserLogoProps) => {
  const { classes } = useUserLogoStyles();

  return (
    <Box className={classes.userLogo}>
      <div className={classes.walletIconBig}>{children}</div>

      {providers.map((provider, index) => {
        return (
          <OauthIcon
            className={classes.walletIconSmall}
            key={provider}
            oauthProvider={provider}
            styles={{
              right: INITIAL_GAP + GAP * index,
            }}
          />
        );
      })}
    </Box>
  );
};
