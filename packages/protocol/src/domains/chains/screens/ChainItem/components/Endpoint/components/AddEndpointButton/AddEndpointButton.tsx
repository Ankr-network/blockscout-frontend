import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useStyles } from './AddEndpointButtonStyles';
import { t } from '@ankr.com/common';
import { ReactComponent as PlusIcon } from 'uiKit/Icons/plus-2.svg';

interface AddEndpointButtonProps {
  link: string;
  isDisabled?: boolean;
}

export const AddEndpointButton = ({
  link,
  isDisabled,
}: AddEndpointButtonProps) => {
  const { classes } = useStyles();

  return (
    <Button
      variant="text"
      color="primary"
      className={classes.button}
      component={RouterLink}
      to={link}
      startIcon={<PlusIcon className={classes.plusIcon} />}
      disabled={isDisabled}
    >
      {t('providers.endpoint.button')}
    </Button>
  );
};
