import { Button, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import React, { MutableRefObject, ForwardedRef } from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import { QueryLoading } from 'uiKit/QueryLoading';

type NavLinksVariant = 'contained' | 'outlined' | 'text';

export interface INavLinkProps {
  component?: string | React.ComponentType;
  href: string;
  variant?: NavLinksVariant;
  activeClassName?: string;
  exactMatch?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

type Props = ButtonProps & INavLinkProps;

export const NavLink = React.forwardRef(
  (
    {
      href,
      variant = 'text',
      activeClassName,
      className,
      exactMatch = false,
      isLoading,
      onClick,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const isLink =
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel');

    const match = useRouteMatch({
      path: href,
      exact: exactMatch,
    });

    const endIcon = isLoading ? <QueryLoading size={16} /> : undefined;

    if (isLink) {
      return (
        <Button
          ref={ref as MutableRefObject<HTMLAnchorElement>}
          className={className}
          component="a"
          endIcon={endIcon}
          href={href}
          rel="noopener noreferrer"
          role="link"
          target="_blank"
          variant={variant}
          onClick={onClick}
          {...(props as unknown)}
        />
      );
    }

    return (
      <Button
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        className={classNames(className, match && activeClassName)}
        component={RouterLink}
        endIcon={endIcon}
        to={href}
        variant={variant}
        onClick={onClick}
        {...(props as unknown)}
      />
    );
  },
);
