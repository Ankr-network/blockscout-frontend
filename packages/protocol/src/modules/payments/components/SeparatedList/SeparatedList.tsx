import { Divider } from '@mui/material';
import { Fragment, ReactNode } from 'react';

import { useSeparatedListStyles } from './useSeparatedListStyles';

export interface ISeparatedListProps {
  children: ReactNode[];
  className?: string;
  shouldRenderFirstDivider?: boolean;
}

export const SeparatedList = ({
  children,
  className,
  shouldRenderFirstDivider = true,
}: ISeparatedListProps) => {
  const { classes, cx } = useSeparatedListStyles();

  return (
    <div className={cx(classes.root, className)}>
      {children.filter(Boolean).map((child, index) => (
        <Fragment key={index}>
          {(index !== 0 || shouldRenderFirstDivider) && <Divider />}
          {child}
        </Fragment>
      ))}
    </div>
  );
};
