import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { NavigationProps } from './NavigationTypes';
import { NavigationSkeleton } from './NavigationSkeleton';
import { isExternalPath } from '../../utils/isExternalPath';
import { useNavigationStyles } from './useNavigationStyles';

export const Navigation = ({ items, loading }: NavigationProps) => {
  const { classes } = useNavigationStyles();

  return (
    <nav>
      {loading ? (
        <NavigationSkeleton />
      ) : (
        <>
          {items.map(
            ({
              ActiveIcon,
              StartIcon,
              href = '',
              isActive,
              isDisabled,
              label,
              onClick,
            }) => {
              if (isExternalPath(href)) {
                return (
                  <Button
                    className={classes.link}
                    component="a"
                    disabled={!href || isDisabled}
                    endIcon={
                      ActiveIcon && (
                        <ActiveIcon className={classes.activeLink} />
                      )
                    }
                    href={href}
                    key={label}
                    onClick={onClick}
                    rel="noopener noreferrer"
                    startIcon={<StartIcon />}
                    target="_blank"
                    variant="text"
                  >
                    {label}
                  </Button>
                );
              }

              return (
                <Button
                  activeClassName={classes.activeLink}
                  className={classes.link}
                  component={NavLink}
                  disabled={!href || isDisabled}
                  endIcon={
                    ActiveIcon && <ActiveIcon className={classes.activeLink} />
                  }
                  isActive={isActive}
                  key={label}
                  onClick={onClick}
                  startIcon={<StartIcon />}
                  to={href}
                  variant="text"
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
