import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { Dialog } from 'uiKit/Dialog';

import { useSampleCodeDialogStyles } from './useSampleCodeDialogStyles';

interface ISampleCodeDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const SampleCodeDialog = ({
  title,
  isOpen,
  onClose,
  children,
}: ISampleCodeDialogProps) => {
  const { classes } = useSampleCodeDialogStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxPxWidth={750}
      paperClassName={classes.paper}
    >
      <div>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.codeArea}>{children}</div>
      </div>
    </Dialog>
  );
};
