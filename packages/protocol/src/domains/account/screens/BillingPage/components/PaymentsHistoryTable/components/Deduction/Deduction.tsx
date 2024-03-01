import { useCallback } from 'react';
import { ArrowToRight } from '@ankr.com/ui';

import { MS_IN_PERIOD } from './const';
import { TransactionsDownloader } from '../../types';
import { useStyles } from './DeductionStyles';

export interface DeductionProps {
  downloader: TransactionsDownloader;
  timestamp: string;
  type: string;
}

export const Deduction = ({ downloader, timestamp, type }: DeductionProps) => {
  const canDownload = Number(timestamp) > Date.now() - MS_IN_PERIOD;

  const { classes } = useStyles(canDownload);

  const onClick = useCallback(() => {
    if (canDownload) {
      downloader(timestamp);
    }
  }, [canDownload, downloader, timestamp]);

  return (
    <span
      className={classes.transaction}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {type} {canDownload && <ArrowToRight className={classes.arrowIcon} />}
    </span>
  );
};
