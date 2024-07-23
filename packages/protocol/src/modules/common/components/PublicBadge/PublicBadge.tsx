import { Chip } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  IUsePublicBadgeStylesProps,
  usePublicBadgeStyles,
} from './usePublicBadgeStyles';

export interface IPublicBadgeProps extends IUsePublicBadgeStylesProps {
  className?: string;
}

export const PublicBadge = ({
  className,
  isOnWhiteBackground = false,
}: IPublicBadgeProps | void = {}) => {
  const { classes, cx } = usePublicBadgeStyles({ isOnWhiteBackground });

  return (
    <Chip
      className={cx(classes.root, className)}
      label={
        <Typography variant="body3" color="textSecondary">
          {t('chains.public')}
        </Typography>
      }
      size="small"
      variant={isOnWhiteBackground ? 'outlined' : 'filled'}
      color="secondary"
    />
  );
};
