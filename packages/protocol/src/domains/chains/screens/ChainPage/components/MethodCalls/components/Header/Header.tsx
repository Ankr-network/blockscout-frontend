import { BlockchainStatsTopRequests } from 'multirpc-sdk';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import { Download } from '@ankr.com/ui';
import { Timeframe } from '@ankr.com/chains-list';
import { t } from '@ankr.com/common';

import { ItemHeader } from '../../../ItemHeader';
import { useHeaderStyles } from './useHeaderStyles';

export interface HeaderProps {
  data?: BlockchainStatsTopRequests[];
  timeframe: Timeframe;
}

export const Header = ({ data, timeframe }: HeaderProps) => {
  const { classes } = useHeaderStyles();

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
        >
          <CSVLink data={data}>
            {t('chain-item.method-calls.download-button')}
          </CSVLink>
        </Button>
      )}
    </div>
  );
};
