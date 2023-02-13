import { t } from '@ankr.com/common';

import { DOCS_ANKR_TOKEN_UNSTAKING_LINK } from 'modules/common/const';

import { useUnstakeInfoStyles } from './useUnstakeInfoStyles';

export const UnstakeInfo = (): JSX.Element => {
  const classes = useUnstakeInfoStyles();

  return (
    <div className={classes.root}>
      <span className={classes.info}>{t('stake-ankr.unstaking.info')}</span>

      <a
        className={classes.link}
        href={DOCS_ANKR_TOKEN_UNSTAKING_LINK}
        rel="noreferrer"
        target="_blank"
      >
        {t('stake-ankr.unstaking.info-link')}
      </a>
    </div>
  );
};
