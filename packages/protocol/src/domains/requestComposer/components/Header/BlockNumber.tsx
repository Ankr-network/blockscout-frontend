import { t } from '@ankr.com/common';
import { Typography, Skeleton } from '@mui/material';

import { useHeaderStyles } from './useHeaderStyles';

interface IBlockNumberProps<T> {
  data: T;
  loading: boolean;
}

export function BlockNumber<T>({ data, loading }: IBlockNumberProps<T>) {
  const { classes, cx } = useHeaderStyles();

  return (
    <>
      {!!data && (
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {t('request-composer.header.last-block-number')}
          </Typography>
          <Typography
            variant="body2"
            className={cx(classes.content, classes.blockNumber)}
          >
            {loading ? <Skeleton className={classes.skeleton} /> : data}
          </Typography>
        </div>
      )}
    </>
  );
}
