import React, { ReactNode } from 'react';

import { Dialog } from 'uiKit/Dialog';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useSampleCodeDialogStyles } from './useSampleCodeDialogStyles';

interface ISampleCodeDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const MAX_TITLE_LENGTH_WITH_BIG_SIZE = 25;

export const SampleCodeDialog = ({
  children,
  isOpen,
  onClose,
  title,
}: ISampleCodeDialogProps) => {
  const { isLightTheme } = useThemes();
  const { classes } = useSampleCodeDialogStyles({
    isLightTheme,
    hasSmallFontSize: title.length > MAX_TITLE_LENGTH_WITH_BIG_SIZE,
  });

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxPxWidth={750}
      paperClassName={classes.paper}
      titleClassName={classes.title}
      title={title}
    >
      <div className={classes.codeArea}>{children}</div>
    </Dialog>
  );
};
