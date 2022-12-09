import CopyToClipboard from 'react-copy-to-clipboard';
import { Typography, TypographyTypeMap } from '@material-ui/core';
import classNames from 'classnames';

import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { useStyles } from './CopyToClipIconStyles';
import { useCopyToClip } from './CopyToClipIconUtils';

interface ICopyToClipIconProps {
  className?: string;
  textClassName?: string;
  text: string;
  message: string;
  copyText?: string;
  size?: 'm' | 'l';
  textColor?: TypographyTypeMap['props']['color'];
  isDisabled?: boolean;
}

export const CopyToClipIcon = ({
  text,
  message,
  className,
  textClassName,
  copyText,
  textColor = 'textSecondary',
  size = 'm',
  isDisabled,
}: ICopyToClipIconProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();
  const classes = useStyles({ size, isDisabled });

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
        <CopyToClipboard
          text={text}
          onCopy={isDisabled ? () => {} : setIsCopied}
        >
          <div className={classes.content}>
            <Typography
              variant="body2"
              noWrap
              className={classNames(classes.text, textClassName)}
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
