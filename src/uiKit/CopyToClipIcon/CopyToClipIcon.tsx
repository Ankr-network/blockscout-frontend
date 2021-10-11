import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { useStyles } from './CopyToClipIconStyles';
import { useCopyToClip } from './CopyToClipIconUtils';

interface ICopyToClipIconProps {
  className?: string;
  text: string;
  message: string;
}

export const CopyToClipIcon = ({
  text,
  message,
  className,
}: ICopyToClipIconProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();
  const classes = useStyles({ isCopied });

  return (
    <div className={classNames(classes.container, className)}>
      {isCopied ? (
        <Typography variant="body2" className={classes.message}>
          {message}
        </Typography>
      ) : (
        <CopyToClipboard text={text} onCopy={setIsCopied}>
          <div className={classes.content}>
            <Typography variant="body2" noWrap className={classes.text}>
              {text}
            </Typography>
            <CopyIcon className={classes.copyIcon} />
          </div>
        </CopyToClipboard>
      )}
    </div>
  );
};
