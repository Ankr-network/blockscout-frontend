import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { isExternalPath } from '../../utils/isExternalPath';

import { useNavigationLinkStyles as useStyles } from './useNavigationLinkStyles';

export interface INavigationLinkProps {
  label: string;
  href?: string;
  isDisabled?: boolean;
  className?: string;
}

export const NavigationLink = ({
  label,
  href = '',
  isDisabled,
  className,
}: INavigationLinkProps): JSX.Element => {
  const classes = useStyles();

  if (isExternalPath(href)) {
    return (
      <Button
        key={label}
        className={classNames(classes.link, className)}
        component="a"
        disabled={!href || isDisabled}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        variant="text"
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      key={label}
      activeClassName={classes.activeLink}
      className={classNames(classes.link, className)}
      component={NavLink}
      disabled={!href || isDisabled}
      to={href}
      variant="text"
    >
      {label}
    </Button>
  );
};
