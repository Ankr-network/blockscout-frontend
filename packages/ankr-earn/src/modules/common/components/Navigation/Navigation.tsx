import React from 'react';
import { NavigationProps } from '.';
import { NavigationLink } from '../NavigationLink/';

export const Navigation = ({ items, className = '' }: NavigationProps) => {
  return (
    <nav className={className}>
      {items.map(({ label, href = '', isDisabled }) => (
        <NavigationLink
          key={label}
          label={label}
          href={href}
          isDisabled={isDisabled}
        ></NavigationLink>
      ))}
    </nav>
  );
};
