import { Box, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';

import { ReactComponent as AnkrIcon } from './assets/ankr.svg';
import { useStyles } from './useStyles';

interface ISpinnerProps {
  size?: number;
}

const DEFAULT_SIZE = 80;

export const AnkrSpinner = ({ size = DEFAULT_SIZE }: ISpinnerProps) => {
  const classes = useStyles({ size });

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.icons}>
          <AnkrIcon className={classes.icon} />
        </Box>
        <Typography variant="h5" className={classes.text}>
          {t('loading')}...
        </Typography>
      </Box>
    </Box>
  );
};
