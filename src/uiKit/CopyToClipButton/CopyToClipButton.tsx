import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { useStyles } from './CopyToClipButtonStyles';
import { useCopyToClip } from '../CopyToClipIcon/CopyToClipIconUtils';

interface ICopyToClipButtonProps {
  className?: string;
  buttonText: string;
  text: string;
  textMessage: string;
}

export const CopyToClipButton = ({
  text,
  textMessage,
  buttonText,
  className,
}: ICopyToClipButtonProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();
  const classes = useStyles({ isCopied });

  return (
    <div className={classNames(classes.container, className)}>
      <CopyToClipboard text={text} onCopy={setIsCopied}>
        <div className={classes.content}>
          <Typography variant="body2" noWrap className={classes.text}>
            {isCopied ? textMessage : text}
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<CopyIcon />}
          >
            {buttonText}
          </Button>
        </div>
      </CopyToClipboard>
    </div>
  );
};
