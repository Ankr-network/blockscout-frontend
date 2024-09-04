import CopyToClipboard from 'react-copy-to-clipboard';
import { Typography, TypographyTypeMap } from '@mui/material';
import { ReactElement, useCallback } from 'react';
import { Copy } from '@ankr.com/ui';

import { useStyles } from './CopyToClipIconStyles';
import { useCopyToClip } from './CopyToClipIconUtils';

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
  textLabel?: string | ReactElement;
  textClassName?: string;
  contentClassName?: string;
  messageClassName?: string;
  textColor?: TypographyTypeMap['props']['color'];
}

export const CopyToClipIcon = ({
  className,
  contentClassName,
  copyText,
  hideIcon,
  isDisabled,
  message,
  messageClassName,
  onClick,
  onCopy = () => {},
  size = 'm',
  text,
  textClassName,
  textColor = 'textSecondary',
  textLabel,
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
        event.stopPropagation();
        event.preventDefault();
      }}
      className={cx(classes.container, className)}
    >
      {isCopied ? (
        <Typography
          variant="subtitle1"
          className={cx(classes.message, messageClassName)}
        >
          {message}
        </Typography>
      ) : (
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <div className={cx(classes.content, contentClassName)}>
            <Typography
              variant="body2"
              noWrap
              className={cx(classes.text, textClassName)}
              color={textColor}
            >
              {textLabel ?? text}
            </Typography>
            <div className={classes.copy}>
              {!hideIcon && <Copy className={classes.copyIcon} />}
              {copyText && (
                <Typography variant="body2" noWrap className={classes.copyText}>
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
