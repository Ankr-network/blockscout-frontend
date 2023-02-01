import React, { ReactNode } from 'react';
import { Dialog } from 'uiKit/Dialog';

import { useSampleCodeDialogStyles } from './useSampleCodeDialogStyles';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

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
  const { isLightTheme } = useThemes();
  const { classes } = useSampleCodeDialogStyles(isLightTheme);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxPxWidth={750}
      paperClassName={classes.paper}
      title={title}
    >
      <div className={classes.codeArea}>{children}</div>
    </Dialog>
  );
};
