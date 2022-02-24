import React, { useCallback } from 'react';
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
  onCopy?: () => void;
  chainId?: string;
}

export const CopyToClipButton = ({
  text,
  textMessage,
  buttonText,
  className,
  onCopy,
  chainId,
}: ICopyToClipButtonProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();
  const classes = useStyles({ isCopied });

  const onClipboardCopy = useCallback(() => {
    setIsCopied();

    if (typeof onCopy === 'function') {
      onCopy();
    }
  }, [setIsCopied, onCopy]);

  return (
    <div className={classNames(classes.container, className, chainId)}>
      <CopyToClipboard text={text} onCopy={onClipboardCopy}>
        <div className={classes.content}>
          <Typography variant="body2" noWrap className={classes.text}>
            {isCopied ? textMessage : text}
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<CopyIcon className={classes.copyIcon} />}
            size="large"
            disableElevation={false}
            disableRipple
          >
            {buttonText}
          </Button>
        </div>
      </CopyToClipboard>
    </div>
  );
};
