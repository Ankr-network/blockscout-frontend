import CopyToClipboard from 'react-copy-to-clipboard';
import { Typography, TypographyTypeMap } from '@mui/material';

import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { useStyles } from './CopyToClipIconStyles';
import { useCopyToClip } from './CopyToClipIconUtils';
import { useCallback } from 'react';

export interface ICopyToClipIconProps {
  className?: string;
  copyText?: string;
  hideIcon?: boolean;
  isDisabled?: boolean;
  message: string;
  onClick?: () => void;
  onCopy?: (text: string) => void;
  size?: 'm' | 'l';
  text: string;
  textClassName?: string;
  textColor?: TypographyTypeMap['props']['color'];
}

export const CopyToClipIcon = ({
  className,
  copyText,
  hideIcon,
  isDisabled,
  message,
  onClick,
  onCopy = () => {},
  size = 'm',
  text,
  textClassName,
  textColor = 'textSecondary',
}: ICopyToClipIconProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();
  const { classes, cx } = useStyles({ size, isDisabled });

  const handleCopy = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (onClick) {
      onClick();

      return;
    }

    setIsCopied();

    onCopy(text);
  }, [isDisabled, onClick, onCopy, setIsCopied, text]);

  return (
    <div
      role="button"
      tabIndex={0}
      /* stop propagation for click event to avoid parent element click */
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
      className={cx(classes.container, className)}
    >
      {isCopied ? (
        <Typography variant="subtitle1" className={classes.message}>
          {message}
        </Typography>
      ) : (
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <div className={classes.content}>
            <Typography
              variant="body2"
              noWrap
              className={cx(classes.text, textClassName)}
              color={textColor}
            >
              {text}
            </Typography>
            <div className={classes.copy}>
              {!hideIcon && <CopyIcon className={classes.copyIcon} />}
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
