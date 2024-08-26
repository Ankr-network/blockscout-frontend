import { Chip } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { usePublicBadgeStyles } from './usePublicBadgeStyles';

export interface IPublicBadgeProps {
  className?: string;
}

export const PublicBadge = ({ className }: IPublicBadgeProps) => {
  const { classes, cx } = usePublicBadgeStyles();

  return (
    <Chip
      className={cx(classes.publicBadge, className)}
      label={
        <Typography variant="body3" color="textSecondary">
          {t('chains.public')}
        </Typography>
      }
      size="small"
      variant="filled"
      color="secondary"
    />
  );
};
