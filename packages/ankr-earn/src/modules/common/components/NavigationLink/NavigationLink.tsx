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
}: INavigationLinkProps) => {
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
