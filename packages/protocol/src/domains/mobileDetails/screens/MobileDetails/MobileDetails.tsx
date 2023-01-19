import React from 'react';
import { Dialog } from '@mui/material';

import { Details } from './components/Details';
import { useStyles } from './useStyles';

interface MobileDetailsProps {
  isOpened: boolean;
  onClose: () => void;
}

export const MobileDetails = ({ isOpened, onClose }: MobileDetailsProps) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={isOpened}
      fullScreen
      onBackdropClick={onClose}
      // @ts-ignore
      style={{ zIndex: 0, inset: '64px 0 80px' }}
      classes={{
        paper: classes.paper,
      }}
    >
      <Details />
    </Dialog>
  );
};
