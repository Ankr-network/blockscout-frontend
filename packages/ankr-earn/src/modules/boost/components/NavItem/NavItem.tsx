import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { NavLink } from 'uiKit/NavLink';
import { useNavItemStyles } from './useNavItemStyles';

interface INavItemProps {
  className?: string;
  children: ReactNode;
  href: string;
}

export const NavItem = ({ className, children, href }: INavItemProps) => {
  const classes = useNavItemStyles();

  return (
    <NavLink
      href={href}
      variant="text"
      className={classNames(classes.root, className)}
      activeClassName={classes.active}
    >
      {children}
    </NavLink>
  );
};
