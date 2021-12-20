import React from 'react';
import { NavigationLink } from '../NavigationLink/';
import { INavigation } from '.';

export const Navigation = ({ items, className = '' }: INavigation) => {
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
