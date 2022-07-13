import { Typography } from '@material-ui/core';
import React from 'react';

import { useNodeItemStyles } from './useNodeItemStyles';

interface INodeItemProps {
  firstValue: string;
  description: string;
  iconSlot?: JSX.Element;
}

export const NodeItem = ({
  firstValue,
  description,
  iconSlot,
}: INodeItemProps): JSX.Element => {
  const classes = useNodeItemStyles();

  return (
    <div className={classes.root}>
      {iconSlot &&
        React.cloneElement(iconSlot, {
          className: classes.networkIcon,
        })}

      <div className={classes.infoWrapper}>
        {firstValue}

        <Typography className={classes.secondary} color="textSecondary">
          {description}
        </Typography>
      </div>
    </div>
  );
};
