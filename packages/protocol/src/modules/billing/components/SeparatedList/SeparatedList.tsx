import { Divider } from '@mui/material';
import { Fragment } from 'react';

import { useSeparatedListStyles } from './useSeparatedListStyles';

export interface ISeparatedListProps {
  children: JSX.Element[];
  className?: string;
}

export const SeparatedList = ({ children, className }: ISeparatedListProps) => {
  const { classes, cx } = useSeparatedListStyles();

  return (
    <div className={cx(classes.root, className)}>
      {children.map((child, index) => (
        <Fragment key={index}>
          <Divider />
          {child}
        </Fragment>
      ))}
    </div>
  );
};
