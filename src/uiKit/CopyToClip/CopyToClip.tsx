import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Box, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { CopyIcon } from 'uiKit/Icons/CopyIcon';

import { useStyles } from './CopyToClipStyles';
import { useCopyToClip } from './CopyToClipUtils';

interface ICopyToClipProps {
  className?: string;
  text: string;
  message: string;
}

export const CopyToClip = ({ text, message, className }: ICopyToClipProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();
  const classes = useStyles({ isCopied });

  return (
    <div className={classNames(classes.container, className)}>
      {isCopied ? (
        <Typography variant="body1" className={classes.message}>
          {message}
        </Typography>
      ) : (
        <CopyToClipboard text={text} onCopy={setIsCopied}>
          <div className={classes.content}>
            <Typography variant="body1" className={classes.text}>
              {text}
            </Typography>
            <CopyIcon className={classes.copyIcon} />
          </div>
        </CopyToClipboard>
      )}
    </div>
  );
};
