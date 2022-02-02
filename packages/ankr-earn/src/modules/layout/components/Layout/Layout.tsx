import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { SwitchBanner } from '../SwitchBanner';
import { useLayoutStyles } from './useLayoutStyles';

export interface ILayoutProps {
  children?: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  verticalAlign?: 'top' | 'center' | 'bottom';
  oldVersionLink?: string;
}

export const Layout = ({
  children,
  headerSlot,
  footerSlot,
  verticalAlign,
  oldVersionLink,
}: ILayoutProps) => {
  const classes = useLayoutStyles();

  return (
    <div className={classes.root}>
      {!!oldVersionLink && <SwitchBanner link={oldVersionLink} />}
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
