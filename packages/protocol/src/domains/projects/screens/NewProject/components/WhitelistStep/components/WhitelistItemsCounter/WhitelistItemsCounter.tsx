import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { WhiteListItem } from 'domains/projects/types';
import { useProjectFormValues } from 'domains/projects/screens/NewProject/hooks/useProjectFormValues';

import { useWhitelistItemsCounterStyles } from './useWhitelistItemsCounterStyles';
import {
  getCounterLabel,
  getWhitelistLimit,
  intlKey,
} from './WhitelistItemsCounterUtils';
import { Graph } from '../Graph';

interface IWhitelistItemsCounterProps {
  type: WhiteListItem;
  className?: string;
}

export const WhitelistItemsCounter = ({
  type,
  className,
}: IWhitelistItemsCounterProps) => {
  const { classes, cx } = useWhitelistItemsCounterStyles();

  const { whitelistItems } = useProjectFormValues();

  const countOfAddedWhitelistItemsWithSelectedType = useMemo(
    () => whitelistItems.filter(item => item.type === type).length,
    [whitelistItems, type],
  );

  const limit = useMemo(() => getWhitelistLimit(type), [type]);

  return (
    <div className={cx(classes.root, className)}>
      <Typography variant="body2">{getCounterLabel(type)}</Typography>

      <Graph
        filled={countOfAddedWhitelistItemsWithSelectedType}
        limit={limit}
      />

      <Typography variant="body2">
        {t(`${intlKey}.counter`, {
          value: countOfAddedWhitelistItemsWithSelectedType,
          limit,
        })}
      </Typography>
    </div>
  );
};
