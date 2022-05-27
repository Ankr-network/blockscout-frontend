import React, { ReactNode, useCallback } from 'react';

import { useNetworkSelectorStyles } from './useNetworkSelectorStyles';

interface INetworkSelectorProps {
  children: ReactNode;
}

export const NetworkSelector = ({
  children,
}: INetworkSelectorProps): JSX.Element => {
  const classes = useNetworkSelectorStyles();

  const modifyChildren = useCallback(
    child => <div className={classes.listItem}>{child}</div>,
    [classes],
  );

  return (
    <div className={classes.list}>
      {React.Children.map(children, child => modifyChildren(child))}
    </div>
  );
};
