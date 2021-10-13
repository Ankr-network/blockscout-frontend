import React from 'react';
import { Button } from '@material-ui/core';

import { StarIcon } from 'uiKit/Icons/StarIcon';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';

interface CreateRpcButtonProps {
  className?: string;
}

export const CreateRpcButton = ({ className }: CreateRpcButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      startIcon={<StarIcon className={classes.icon} />}
      className={className}
    >
      {t('dashboard.create-rpc-button')}
    </Button>
  );
};
