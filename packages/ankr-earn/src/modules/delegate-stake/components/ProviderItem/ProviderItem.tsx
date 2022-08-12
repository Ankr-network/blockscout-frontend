import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';

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
            value: nodeAPY.decimalPlaces(DEFAULT_ROUNDING).toFixed(),
          })}
        </div>
      </div>
    </div>
  );
};
