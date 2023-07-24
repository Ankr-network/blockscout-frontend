import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from '@mui/material';
import { Copy } from '@ankr.com/ui';

import { useCopyToClip } from 'uiKit/CopyToClipIcon/CopyToClipIconUtils';

import { copyMessage, label } from './const';
import { useStyles } from './CopyCodeButtonStyles';

export interface CopyCodeButtonProps {
  text?: string;
  code: string;
}

export const CopyCodeButton = ({ code, text }: CopyCodeButtonProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();

  const { classes } = useStyles();

  return (
    <CopyToClipboard text={code} onCopy={setIsCopied}>
      <Button
        className={classes.copyCodeButton}
        startIcon={<Copy />}
        variant="outlined"
      >
        {isCopied ? copyMessage : text || label}
      </Button>
    </CopyToClipboard>
  );
};
