import React from 'react';
import { Button } from '@material-ui/core';

import { ItemHeader } from '../../../ItemHeader';
import { ReactComponent as DownloadIcon } from '../../assets/download.svg';
import { Timeframe } from 'domains/chains/types';
import { t } from 'common';
import { useHeaderStyles } from './useHeaderStyles';

const SHOW_DOWNLOAD_BUTTON = false;

export interface HeaderProps {
  timeframe: Timeframe;
}

export const Header = ({ timeframe }: HeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.root}>
      <ItemHeader
        timeframe={timeframe}
        title={t('chain-item.method-calls.title')}
      />
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
