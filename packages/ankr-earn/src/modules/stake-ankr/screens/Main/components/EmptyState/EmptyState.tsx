import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { ReactComponent as AnkrBigLogo } from './assets/ankr-logo-big.svg';
import { Description } from './Description';
import { useEmptyStateStyles } from './useEmptyStateStyles';

export const EmptyState = (): JSX.Element => {
  const classes = useEmptyStateStyles();

  return (
    <Paper className={classes.paper}>
      <AnkrBigLogo />

      <Typography className={classes.wrapper} variant="h3">
        {t('stake-ankr.empty-state.start')}
      </Typography>

      <Typography className={classes.wrapper}>
        {t('stake-ankr.empty-state.start-description')}
      </Typography>

      <NavLink
        className={classNames(classes.button, classes.wrapper)}
        href="stakeLink"
        variant="outlined"
      >
        {t('stake-ankr.empty-state.how-it-works')}
      </NavLink>

      <Description />
    </Paper>
  );
};
