import { Divider } from '@mui/material';
import { Fragment, ReactNode } from 'react';

import { useSeparatedListStyles } from './useSeparatedListStyles';

export interface ISeparatedListProps {
  children: ReactNode[];
  className?: string;
}

export const SeparatedList = ({ children, className }: ISeparatedListProps) => {
  const { classes, cx } = useSeparatedListStyles();

  return (
    <div className={cx(classes.root, className)}>
      {children.filter(Boolean).map((child, index) => (
        <Fragment key={index}>
          <Divider />
          {child}
        </Fragment>
      ))}
    </div>
  );
};
