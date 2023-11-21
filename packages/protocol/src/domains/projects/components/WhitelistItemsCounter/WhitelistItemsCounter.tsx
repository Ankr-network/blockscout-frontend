import { Typography } from '@mui/material';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { getWhitelistItemsLimit } from 'domains/projects/utils/getWhitelistItemsLimit';
import { whitelistTypeLabelMap } from 'domains/projects/const';

import { Graph } from '../Graph';
import { useWhitelistItemsCounterStyles } from './useWhitelistItemsCounterStyles';

export interface WhitelistItemsCounterProps {
  className?: string;
  count: number;
  type: UserEndpointTokenMode;
}

export const WhitelistItemsCounter = ({
  className,
  count,
  type,
}: WhitelistItemsCounterProps) => {
  const limit = useMemo(() => getWhitelistItemsLimit(type), [type]);

  const { classes, cx } = useWhitelistItemsCounterStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Typography variant="body2">
        {t(whitelistTypeLabelMap[type], { plurals: 2 })}
      </Typography>
      <Graph filled={count} limit={limit} />
      <Typography variant="body2">
        {t(`projects.whitelist-items-counter.count`, { count, limit })}
      </Typography>
    </div>
  );
};
