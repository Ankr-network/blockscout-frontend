import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { useProviderItemStyles } from './useProviderItemStyles';

interface IProviderItemProps {
  name: string;
  nodeAPY: BigNumber;
  status?: string;
}

export const ProviderItem = ({
  name,
  nodeAPY,
  status,
}: IProviderItemProps): JSX.Element => {
  const classes = useProviderItemStyles();

  return (
    <div className={classes.root}>
      <div
        className={classNames(classes.dot, {
          [classes.greenDot]: status === 'green',
          [classes.redDot]: status === 'red',
        })}
      />

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
