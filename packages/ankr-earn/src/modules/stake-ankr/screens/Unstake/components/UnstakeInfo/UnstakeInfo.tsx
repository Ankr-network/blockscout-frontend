import { t } from '@ankr.com/common';
import { NavLink } from 'react-router-dom';

import { DOCS_ANKR_TOKEN_UNSTAKING_LINK } from 'modules/common/const';

import { useUnstakeInfoStyles } from './useUnstakeInfoStyles';

export const UnstakeInfo = (): JSX.Element => {
  const classes = useUnstakeInfoStyles();

  return (
    <div className={classes.root}>
      <span className={classes.info}>{t('stake-ankr.unstaking.info')}</span>

      <NavLink className={classes.link} to={DOCS_ANKR_TOKEN_UNSTAKING_LINK}>
        Learn more
      </NavLink>
    </div>
  );
};
