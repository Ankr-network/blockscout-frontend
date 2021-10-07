import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { useStyles } from './NavigationStyles';
import { NavigationProps } from './NavigationTypes';

export const Navigation = ({ items }: NavigationProps) => {
  const classes = useStyles();

  return (
    <nav>
      {items.map(({ label, href = '', Icon, isDisabled }) => {
        return (
          <Button
            key={label}
            component={NavLink}
            to={href}
            variant="text"
            activeClassName={classes.activeLink}
            className={classes.link}
            startIcon={<Icon className={classes.icon} />}
            disabled={!href || isDisabled}
          >
            {label}
          </Button>
        );
      })}
    </nav>
  );
};
