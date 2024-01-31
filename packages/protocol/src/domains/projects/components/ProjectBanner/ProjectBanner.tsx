import { IconButton, Paper, Typography } from '@mui/material';
import {
  TriangleWarning as WarningIcon,
  Close as CloseIcon,
} from '@ankr.com/ui';
import { ReactElement, useState } from 'react';

import { useProjectBannerStyles } from './useProjectBannerStyles';

interface ProjectBannerProps {
  message: string;
  className?: string;
  hasCloseIcon?: boolean;
  button?: ReactElement;
}

export const ProjectBanner = ({
  message,
  className,
  hasCloseIcon,
  button,
}: ProjectBannerProps) => {
  const { classes, cx } = useProjectBannerStyles();

  const [isHidden, setIsHidden] = useState(false);

  const handleClose = () => {
    setIsHidden(true);
  };

  if (isHidden) {
    return null;
  }

  return (
    <Paper className={cx(classes.root, className)}>
      <WarningIcon className={classes.iconWarning} />
      <Typography className={classes.message} variant="body3">
        {message}
      </Typography>
      {button && button}
      {hasCloseIcon && (
        <IconButton
          aria-label="close"
          className={cx(classes.closeButton)}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Paper>
  );
};
