import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { NavLink } from 'uiKit/NavLink';

import { useBigNavItemStyles } from './useBigNavItemStyles';

interface IBigNavItemProps {
  className?: string;
  children: ReactNode;
  href: string;
}

export const BigNavItem = ({
  className,
  children,
  href,
}: IBigNavItemProps): JSX.Element => {
  const classes = useBigNavItemStyles();

  return (
    <NavLink
      exactMatch
      activeClassName={classes.active}
      className={classNames(classes.root, className)}
      href={href}
      variant="text"
    >
      {children}
    </NavLink>
  );
};
