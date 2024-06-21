import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useSoonLabelStyles } from './SoonLabelStyles';

export interface SoonLabelProps {
  component?: React.ElementType;
  label?: string;
  className?: string;
}

export const SoonLabel = ({
  className,
  component = 'div',
  label,
}: SoonLabelProps) => {
  const { classes, cx } = useSoonLabelStyles();

  return (
    <Typography
      component={component}
      className={cx(classes.soonLabel, className)}
    >
      {label || t('common.soon')}
    </Typography>
  );
};
