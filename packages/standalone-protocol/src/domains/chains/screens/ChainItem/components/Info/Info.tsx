import { Button, Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './InfoStyles';
import { PROTOCOL_URL } from 'Routes';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';

export const Info = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-test-id="info">
      <Typography className={classes.title} variant="h2">
        {tHTML('chain-item.info.title')}
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        endIcon={<ArrowRightIcon className={classes.copyIcon} />}
        href={PROTOCOL_URL}
        target="_blank"
      >
        {t('chain-item.info.button')}
      </Button>
    </div>
  );
};
