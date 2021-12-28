import { Grid, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Spinner } from 'ui/src/components/Spinner';
import { usePendingStyles as useStyles } from './usePendingStyles';

interface IPendingProps {
  value: number;
  token: string;
}

export const Pending = ({ value, token }: IPendingProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item className={classes.spinner}>
        <Spinner size={14} />
      </Grid>

      <Grid item>
        <Typography className={classes.value}>
          {t('dashboard.pending', { value, token })}
        </Typography>
      </Grid>
    </Grid>
  );
};
