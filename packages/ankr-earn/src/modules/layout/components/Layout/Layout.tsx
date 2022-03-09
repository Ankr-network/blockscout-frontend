import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useLayoutStyles } from './useLayoutStyles';

export interface ILayoutProps {
  children?: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  verticalAlign?: 'top' | 'center' | 'bottom';
}

export const Layout = ({
  children,
  headerSlot,
  footerSlot,
  verticalAlign,
}: ILayoutProps): JSX.Element => {
  const classes = useLayoutStyles();

  return (
    <div className={classes.root}>
      {headerSlot}

      <main
        className={classNames({
          [classes.mainAlignTop]: verticalAlign === 'top',
        })}
      >
        {children}
      </main>

      {footerSlot}
    </div>
  );
};
