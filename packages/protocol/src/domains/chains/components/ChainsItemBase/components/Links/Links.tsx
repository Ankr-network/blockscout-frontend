import { Box, Typography } from '@mui/material';
import { Lock } from '@ankr.com/ui';
import { ReactNode } from 'react';

import { useLinksStyles } from './LinksStyles';

export interface LinksProps {
  children: ReactNode;
  inactiveMessage?: string;
}

export const Links = ({ children, inactiveMessage }: LinksProps) => {
  const { classes } = useLinksStyles();

  const inactiveContent = (
    <Box className={classes.content}>
      <Typography className={classes.text} variant="subtitle1">
        {inactiveMessage}
      </Typography>
      <Lock className={classes.icon} />
    </Box>
  );

  return (
    <div className={classes.root}>
      {inactiveMessage ? inactiveContent : children}
    </div>
  );
};
