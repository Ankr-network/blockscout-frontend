import { ArrowTopRightIcon } from 'uiKit/Icons/ArrowTopRightIcon';
import { MS_IN_PERIOD } from './const';
import { TransactionsDownloader } from '../../types';
import { useStyles } from './DeductionStyles';
import { useCallback } from 'react';

export interface DeductionProps {
  downloader: TransactionsDownloader;
  timestamp: string;
  type: string;
}

export const Deduction = ({ downloader, timestamp, type }: DeductionProps) => {
  const canDownload = Number(timestamp) > Date.now() - MS_IN_PERIOD;

  const classes = useStyles(canDownload);

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
      {type}{' '}
      {canDownload && <ArrowTopRightIcon className={classes.arrowIcon} />}
    </span>
  );
};
