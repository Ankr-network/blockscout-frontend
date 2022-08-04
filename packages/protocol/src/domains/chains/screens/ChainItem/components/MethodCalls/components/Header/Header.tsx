import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { t } from 'common';
import { useHeaderStyles } from './useHeaderStyles';
import { ReactComponent as DownloadIcon } from '../../assets/download.svg';

const SHOW_DOWNLOAD_BUTTON = false;

export const Header = () => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {t('chain-item.method-calls.title')}
      </Typography>
      {SHOW_DOWNLOAD_BUTTON && (
        <Button
          variant="text"
          className={classes.button}
          startIcon={<DownloadIcon />}
        >
          {t('chain-item.method-calls.download-button')}
        </Button>
      )}
    </div>
  );
};
