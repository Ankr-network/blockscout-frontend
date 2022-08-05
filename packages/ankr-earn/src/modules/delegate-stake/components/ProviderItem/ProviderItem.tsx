import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { t } from 'common';

import { useProviderItemStyles } from './useProviderItemStyles';

interface IProviderItemProps {
  name: string;
  nodeAPY: BigNumber;
  statusSlot?: ReactNode;
}

export const ProviderItem = ({
  name,
  nodeAPY,
  statusSlot,
}: IProviderItemProps): JSX.Element => {
  const classes = useProviderItemStyles();

  return (
    <div className={classes.root}>
      {statusSlot}

      <div className={classes.infoWrapper}>
        {name}

        <div className={classes.nodeAmount}>
          {t('stake-ankr.staking-table.apy', {
            value: nodeAPY.integerValue().toFixed(),
          })}
        </div>
      </div>
    </div>
  );
};
