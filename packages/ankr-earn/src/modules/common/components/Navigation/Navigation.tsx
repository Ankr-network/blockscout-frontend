import React from 'react';
import { INavigationLinkProps, NavigationLink } from '../NavigationLink';
export interface INavigationProps {
  items: INavigationLinkProps[];
  className?: string;
}

export const Navigation = ({ items, className = '' }: INavigationProps) => {
  return (
    <nav className={className}>
      {items.map(({ label, href = '', isDisabled }) => (
        <NavigationLink
          key={label}
          label={label}
          href={href}
          isDisabled={isDisabled}
        />
      ))}
    </nav>
  );
};
