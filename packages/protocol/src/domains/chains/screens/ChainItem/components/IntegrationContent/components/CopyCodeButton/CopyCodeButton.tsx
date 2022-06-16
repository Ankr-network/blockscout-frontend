import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from '@material-ui/core';

import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { copyMessage, label } from './const';
import { useCopyToClip } from 'uiKit/CopyToClipIcon/CopyToClipIconUtils';
import { useStyles } from './CopyCodeButtonStyles';

export interface CopyCodeButtonProps {
  code: string;
}

export const CopyCodeButton = ({ code }: CopyCodeButtonProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();

  const classes = useStyles();

  return (
    <CopyToClipboard text={code} onCopy={setIsCopied}>
      <Button
        className={classes.copyCodeButton}
        startIcon={<CopyIcon />}
        variant="outlined"
      >
        {isCopied ? copyMessage : label}
      </Button>
    </CopyToClipboard>
  );
};
