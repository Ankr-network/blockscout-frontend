import React from 'react';
import { Button } from '@mui/material';

import { ItemHeader } from '../../../ItemHeader';
import { Download } from '@ankr.com/ui';
import { Timeframe } from 'domains/chains/types';
import { t } from '@ankr.com/common';
import { useHeaderStyles } from './useHeaderStyles';

const SHOW_DOWNLOAD_BUTTON = false;

export interface HeaderProps {
  timeframe: Timeframe;
}

export const Header = ({ timeframe }: HeaderProps) => {
  const { classes } = useHeaderStyles();

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
          startIcon={<Download />}
        >
          {t('chain-item.method-calls.download-button')}
        </Button>
      )}
    </div>
  );
};
