import { ReactNode } from 'react';

import { useProviderItemStyles } from './useProviderItemStyles';

interface IProviderItemProps {
  name: string;
  nodeAmount: number;
  statusSlot?: ReactNode;
}

export const ProviderItem = ({
  name,
  nodeAmount,
  statusSlot,
}: IProviderItemProps): JSX.Element => {
  const classes = useProviderItemStyles();

  const renderNodeAmount = (value: number): string => {
    return `${value} node${value === 1 ? '' : 's'}`;
  };

  return (
    <div className={classes.root}>
      {statusSlot}

      <div className={classes.infoWrapper}>
        {name}

        {nodeAmount > 0 && (
          <div className={classes.nodeAmount}>
            {renderNodeAmount(nodeAmount)}
          </div>
        )}
      </div>
    </div>
  );
};
