import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { Copy, Lock } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useEndpointPlaceholderStyles } from './useEndpointPlaceholderStyles';

interface IEndpointProps {
  title: ReactNode;
  label?: string;
  labelClassName?: string;
  lockedLabel?: string;
  onClick?: () => void;
}

export const EndpointPlaceholder = ({
  label,
  labelClassName,
  lockedLabel = t('chain-item.get-started.endpoints.lockedLabelWss'),
  onClick,
  title,
}: IEndpointProps) => {
  const { classes, cx } = useEndpointPlaceholderStyles();

  return (
    <div className={classes.endpointPlaceholderRoot}>
      {title}
      <Box
        role="button"
        tabIndex={0}
        className={classes.endpointPlaceholderContainer}
        onClick={onClick}
        sx={{
          cursor: onClick ? 'pointer' : 'auto',
        }}
      >
        <div className={cx(classes.placeholderContent, labelClassName)}>
          {label || (
            <>
              <Lock className={classes.endpointPlaceholderLockIcon} />
              <Typography variant="body2">{lockedLabel}</Typography>
              <Copy className={classes.copyIcon} />
            </>
          )}
        </div>
      </Box>
    </div>
  );
};
