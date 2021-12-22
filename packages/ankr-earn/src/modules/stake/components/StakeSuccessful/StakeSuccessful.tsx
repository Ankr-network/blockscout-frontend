import { Container, Paper, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { NavLink } from 'uiKit/NavLink';
import { useStakeSuccessful as useStyles } from './useStakeSuccessful';

export interface IStakeSuccessful {
  token: AvailableTokens;
  stakeHref: string;
}

// TODO: import proper dashboard route when dashboard routes is completed

const dashboardHref = '/dashboard';

export const StakeSuccessful = ({ token, stakeHref }: IStakeSuccessful) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.box} variant="outlined" square={false}>
        <div className={classes.wrapper}>
          <Typography variant="h1">{t('stake.success.title')}</Typography>
          <Typography>{t('stake.success.description', { token })}</Typography>
          <NavLink
            variant="contained"
            fullWidth
            href={dashboardHref}
            className={classes.button}
          >
            {t('stake.success.return')}
          </NavLink>
          <NavLink
            variant="outlined"
            fullWidth
            href={stakeHref}
            className={classes.button}
          >
            {t('stake.success.add-to-wallet', { token })}
          </NavLink>
        </div>
      </Paper>
    </Container>
  );
};
