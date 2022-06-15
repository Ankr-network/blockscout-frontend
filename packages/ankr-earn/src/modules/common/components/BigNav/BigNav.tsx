import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import React, { Children } from 'react';
import { uid } from 'react-uid';

import { useBigNavStyles } from './useBigNavStyles';

export const BigNav = ({
  children,
  className,
  component = 'nav',
  ...restBoxProps
}: BoxProps): JSX.Element => {
  const classes = useBigNavStyles();

  return (
    <Box
      {...restBoxProps}
      className={classNames(classes.root, className)}
      component={component}
    >
      <ul className={classes.list}>
        {Children.map(children, (child, index) => (
          <li key={uid(index)} className={classes.item}>
            {child}
          </li>
        ))}
      </ul>
    </Box>
  );
};
