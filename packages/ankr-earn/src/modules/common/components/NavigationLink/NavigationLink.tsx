import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { useNavigationLinkStyles as useStyles } from './useNavigationLinkStyles';
import { NavigationItem } from './NavigationLinkTypes';
import { isExternalPath } from '../../utils/isExternalPath';
import classNames from 'classnames';

export const NavigationLink = ({
  label,
  href = '',
  isDisabled,
  className,
}: NavigationItem) => {
  const classes = useStyles();

  if (isExternalPath(href)) {
    return (
      <Button
        key={label}
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        className={classNames(classes.link, className)}
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
      className={classNames(classes.link, className)}
      disabled={!href || isDisabled}
    >
      {label}
    </Button>
  );
};
