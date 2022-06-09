import React from 'react';

import { INavigationLinkProps, NavigationLink } from '../NavigationLink';

export interface INavigationProps {
  items: INavigationLinkProps[];
  className?: string;
}

export const Navigation = ({
  items,
  className = '',
}: INavigationProps): JSX.Element => {
  return (
    <nav className={className}>
      {items.map(({ label, href = '', isDisabled }) => (
        <NavigationLink
          key={label}
          data-testid={label}
          href={href}
          isDisabled={isDisabled}
          label={label}
        />
      ))}
    </nav>
  );
};
