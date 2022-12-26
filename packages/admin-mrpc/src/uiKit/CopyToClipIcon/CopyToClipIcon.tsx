import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Typography, TypographyTypeMap } from '@mui/material';
import classNames from 'classnames';

import { ReactComponent as CopyIcon } from 'assets/img/copy.svg';
import { useStyles } from './CopyToClipIconStyles';
import { useCopyToClip } from './CopyToClipIconUtils';

interface ICopyToClipIconProps {
  className?: string;
  text: string;
  message: string;
  copyText?: string;
  size?: 'medium' | 'large';
  textColor?: TypographyTypeMap['props']['color'];
}

export const CopyToClipIcon = ({
  text,
  message,
  className,
  copyText,
  textColor = 'textSecondary',
  size = 'large',
}: ICopyToClipIconProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();
  const { classes } = useStyles({ size });

  return (
    <div
      role="button"
      tabIndex={0}
      /* stop propagation for click event to avoid parent element click */
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
      className={classNames(classes.container, className)}
    >
      {isCopied ? (
        <Typography variant="subtitle1" className={classes.message}>
          {message}
        </Typography>
      ) : (
        <CopyToClipboard text={text} onCopy={setIsCopied}>
          <div className={classes.content}>
            <Typography
              variant="body2"
              noWrap
              className={classes.text}
              color={textColor}
            >
              {text}
            </Typography>
            <div className={classes.copy}>
              <CopyIcon className={classes.copyIcon} />
              {copyText && (
                <Typography
                  variant="subtitle1"
                  noWrap
                  className={classes.copyText}
                >
                  {copyText}
                </Typography>
              )}
            </div>
          </div>
        </CopyToClipboard>
      )}
    </div>
  );
};