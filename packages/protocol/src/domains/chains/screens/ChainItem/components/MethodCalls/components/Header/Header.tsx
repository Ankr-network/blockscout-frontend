import React, { useCallback } from 'react';
import { Button } from '@mui/material';

import { PrivateStatTopRequests } from 'multirpc-sdk';
import { Download } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { downloadCsv } from 'modules/common/utils/downloadCsv';
import { Timeframe } from 'domains/chains/types';
import { ItemHeader } from '../../../ItemHeader';
import { useHeaderStyles } from './useHeaderStyles';

export interface HeaderProps {
  timeframe: Timeframe;
  data?: PrivateStatTopRequests[];
}

export const Header = ({ timeframe, data }: HeaderProps) => {
  const { classes } = useHeaderStyles();

  const download = useCallback(() => {
    const title = `${new Date().toLocaleDateString()}_method-calls`;
    return downloadCsv(JSON.stringify(data), title);
  }, [data]);

  return (
    <div className={classes.root}>
      <ItemHeader
        timeframe={timeframe}
        title={t('chain-item.method-calls.title')}
      />
      {data && data.length > 0 && (
        <Button
          variant="text"
          className={classes.button}
          startIcon={<Download />}
          onClick={download}
        >
          {t('chain-item.method-calls.download-button')}
        </Button>
      )}
    </div>
  );
};
