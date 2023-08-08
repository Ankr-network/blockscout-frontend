import { t } from '@ankr.com/common';

import { useTitleStyles } from './useTitleStyles';
import { intlRoot } from '../../LearnMoreUtils';

export const Title = () => {
  const { classes } = useTitleStyles();

  return <div className={classes.root}>{t(`${intlRoot}.title`)}</div>;
};
