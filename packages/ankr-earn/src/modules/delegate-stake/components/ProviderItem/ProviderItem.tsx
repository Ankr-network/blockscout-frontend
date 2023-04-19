import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

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

        <div className={classes.apr}>
          {t('stake-ankr.staking-table.apr', {
            value: nodeAPY.decimalPlaces(DEFAULT_ROUNDING).toFixed(),
          })}
        </div>
      </div>
    </div>
  );
};