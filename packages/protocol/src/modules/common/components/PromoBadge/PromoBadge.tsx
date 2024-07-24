import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { promoBadgeTranslation } from './translation';
import { usePromoBadgeStyles } from './usePromoBadgeStyles';

export interface IPromoBadgeProps {
  className?: string;
}

export const PromoBadge = ({ className }: IPromoBadgeProps) => {
  const { keys, t } = useTranslation(promoBadgeTranslation);
  const { classes, cx } = usePromoBadgeStyles();

  return (
    <Typography
      className={cx(classes.root, className)}
      component="div"
      variant="body3"
    >
      {t(keys.label)}
    </Typography>
  );
};
