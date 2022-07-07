import { ReactNode } from 'react';

import { t } from 'common';

import { useProviderCellStyles } from './useProviderCellStyles';

interface IProviderCellProps {
  title: string;
  nodesCount: number;
  statusSlot?: ReactNode;
}

export const ProviderCell = ({
  title,
  nodesCount,
  statusSlot,
}: IProviderCellProps): JSX.Element => {
  const classes = useProviderCellStyles();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.title} title={title}>
          {title}
        </div>

        <div className={classes.nodes}>
          {t('stake-ankr.select-provider.table.nodes-count', {
            value: nodesCount,
          })}
        </div>
      </div>

      {statusSlot}
    </div>
  );
};
