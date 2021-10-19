import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { useStyles } from './NavigationStyles';
import { NavigationProps } from './NavigationTypes';

export const Navigation = ({ items }: NavigationProps) => {
  const classes = useStyles();

  return (
    <nav>
      {items.map(({ label, href = '', StartIcon, EndIcon, isDisabled }) => {
        return (
          <Button
            key={label}
            component={NavLink}
            to={href}
            variant="text"
            activeClassName={classes.activeLink}
            className={classes.link}
            startIcon={<StartIcon className={classes.icon} />}
            endIcon={EndIcon && <EndIcon className={classes.endIcon} />}
            disabled={!href || isDisabled}
          >
            {label}
          </Button>
        );
      })}
    </nav>
  );
};
