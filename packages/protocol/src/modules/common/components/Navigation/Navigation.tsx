import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { useStyles } from './NavigationStyles';
import { NavigationProps } from './NavigationTypes';
import { isExternalPath } from '../../utils/isExternalPath';

export const Navigation = ({ items }: NavigationProps) => {
  const classes = useStyles();

  return (
    <nav>
      {items.map(
        ({ label, href = '', StartIcon, EndIcon, isDisabled, isActive }) => {
          if (isExternalPath(href)) {
            return (
              <Button
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                className={classes.link}
                startIcon={<StartIcon />}
                endIcon={EndIcon && <EndIcon className={classes.endIcon} />}
                disabled={!href || isDisabled}
              >
                {label}
              </Button>
            );
          }

          return (
            <Button
              key={label}
              component={NavLink}
              to={href}
              variant="text"
              activeClassName={classes.activeLink}
              className={classes.link}
              startIcon={<StartIcon />}
              endIcon={EndIcon && <EndIcon className={classes.endIcon} />}
              disabled={!href || isDisabled}
              isActive={isActive}
            >
              {label}
            </Button>
          );
        },
      )}
    </nav>
  );
};
