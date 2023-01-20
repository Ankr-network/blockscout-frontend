import { t } from '@ankr.com/common';
import { NavLink } from 'react-router-dom';

import { RoutesConfig } from 'modules/stake-ankr/RoutesConfig';

import { useUnstakeStepsSuccessHintStyles } from './useUnstakeStepsSuccessHintStyles';

const ANKR_STAKING_LINK = RoutesConfig.stake.generatePath();

export const UnstakeStepsSuccessHint = (): JSX.Element => {
  const classes = useUnstakeStepsSuccessHintStyles();

  return (
    <div className={classes.root}>
      <span className={classes.info}>
        {t('stake-ankr.unstaking.success-info')}
      </span>

      <NavLink className={classes.link} to={ANKR_STAKING_LINK}>
        {t('stake-ankr.unstaking.staking-page-link')}
      </NavLink>
      .
    </div>
  );
};
