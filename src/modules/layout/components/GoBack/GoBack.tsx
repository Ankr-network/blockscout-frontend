import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { IconButton, Typography } from '@material-ui/core';

import { ReactComponent as BackIcon } from './assets/back.svg';
import { t } from '../../../i18n/utils/intl';
import { useGoBackStyles } from './useGoBackStyles';

export const GoBack = () => {
  const classes = useGoBackStyles();
  const { goBack } = useHistory();
  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <div
      className={classes.root}
      onClick={handleBack}
      role="button"
      tabIndex={0}
    >
      <IconButton className={classes.icon}>
        <BackIcon />
      </IconButton>
      <Typography>{t('go-back.action')}</Typography>
    </div>
  );
};
