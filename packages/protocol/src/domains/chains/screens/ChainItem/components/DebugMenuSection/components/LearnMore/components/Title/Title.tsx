import { t } from '@ankr.com/common';

import { intlRoot } from '../../const';
import { useTitleStyles } from './TitleStyles';

export const Title = () => {
  const { classes } = useTitleStyles();

  return <div className={classes.root}>{t(`${intlRoot}.title`)}</div>;
};
