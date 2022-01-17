import { Typography } from '@material-ui/core';
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
    <div className={classes.root}>
      <Spinner centered={false} size={14} />

      <Typography className={classes.value}>
        {t('dashboard.pending', { value, token })}
      </Typography>
    </div>
  );
};
