import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { NavLink } from 'uiKit/NavLink';

import { useNavItemStyles } from './useNavItemStyles';

interface INavItemProps {
  className?: string;
  children: ReactNode;
  href: string;
}

export const NavItem = ({
  className,
  children,
  href,
}: INavItemProps): JSX.Element => {
  const classes = useNavItemStyles();

  return (
    <NavLink
      activeClassName={classes.active}
      className={classNames(classes.root, className)}
      href={href}
      variant="text"
    >
      {children}
    </NavLink>
  );
};
