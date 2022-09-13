import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { useNavigationStyles } from './useNavigationStyles';
import { NavigationProps } from './NavigationTypes';
import { isExternalPath } from '../../utils/isExternalPath';
import { NavigationSkeleton } from './NavigationSkeleton';

export const Navigation = ({ items, loading }: NavigationProps) => {
  const classes = useNavigationStyles();

  return (
    <nav>
      {loading ? (
        <NavigationSkeleton />
      ) : (
        <>
          {items.map(
            ({
              label,
              href = '',
              StartIcon,
              ActiveIcon,
              isDisabled,
              isActive,
            }) => {
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
                    endIcon={
                      ActiveIcon && (
                        <ActiveIcon className={classes.activeIcon} />
                      )
                    }
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
                  endIcon={
                    ActiveIcon && <ActiveIcon className={classes.activeIcon} />
                  }
                  disabled={!href || isDisabled}
                  isActive={isActive}
                >
                  {label}
                </Button>
              );
            },
          )}
        </>
      )}
    </nav>
  );
};
