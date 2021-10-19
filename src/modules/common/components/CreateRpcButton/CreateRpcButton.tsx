import React from 'react';
import { Button } from '@material-ui/core';

import { StarIcon } from 'uiKit/Icons/StarIcon';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';

export const CreateRpcButton: typeof Button = (props: any) => {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      startIcon={<StarIcon className={classes.icon} />}
      {...props}
    >
      {t('dashboard.create-rpc-button')}
    </Button>
  );
};
