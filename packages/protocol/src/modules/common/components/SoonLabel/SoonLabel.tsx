import { t } from '@ankr.com/common';

import { useSoonLabelStyles } from './SoonLabelStyles';

export interface SoonLabelProps {
  className?: string;
}

export const SoonLabel = ({ className }: SoonLabelProps) => {
  const { classes, cx } = useSoonLabelStyles();

  return <div className={cx(className, classes.root)}>{t('common.soon')}</div>;
};
