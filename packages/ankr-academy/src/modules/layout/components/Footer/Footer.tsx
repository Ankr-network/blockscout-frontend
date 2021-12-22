import React from 'react';
import { useFooterStyles } from './useFooterStyles';
import { Menu } from './Menu';
import { Privacy } from './Privacy';

export const Footer = () => {
  const classes = useFooterStyles();

  return (
    <div className={classes.inner}>
      <Menu />
      <Privacy />
    </div>
  );
};
