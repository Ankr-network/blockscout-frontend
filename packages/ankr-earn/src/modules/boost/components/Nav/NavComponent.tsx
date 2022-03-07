import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import React, { Children } from 'react';
import { uid } from 'react-uid';

import { useNavStyles } from './useNavStyles';

export const NavComponent = ({
  children,
  className,
  ...restBoxProps
}: BoxProps): JSX.Element => {
  const classes = useNavStyles();

  return (
    <Box {...restBoxProps} className={classNames(classes.root, className)}>
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
