import { t } from '@ankr.com/common';
import { Typography, Skeleton } from '@mui/material';
import { ChainID } from '@ankr.com/chains-list';

import { useHeaderStyles } from './useHeaderStyles';

interface IBlockNumberProps<T> {
  data: T;
  loading: boolean;
  chainId?: string;
}

export function BlockNumber<T>({
  chainId,
  data,
  loading,
}: IBlockNumberProps<T>) {
  const { classes, cx } = useHeaderStyles(false);

  return (
    <>
      {!!data && (
        <div className={classes.define}>
          <Typography variant="body2" className={classes.label}>
            {chainId === ChainID.OPTIMISM
              ? t('request-composer.header.transaction-count')
              : t('request-composer.header.last-block-number')}
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
