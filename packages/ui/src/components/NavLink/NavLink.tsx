import { Button, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { Spinner } from '../Spinner';
import React, { MutableRefObject, ForwardedRef, createElement } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouteLinkProps,
  useRouteMatch,
} from 'react-router-dom';

type NavLinksVariant = 'contained' | 'outlined' | 'text';

export interface INavLinkProps {
  isRouterLink?: boolean;
  routerLinkProps?: Partial<RouteLinkProps>;
  component?: string | React.ComponentType;
  href: string;
  variant?: NavLinksVariant;
  activeClassName?: string;
  exactMatch?: boolean;
  isLoading?: boolean;
  loader?: JSX.Element;
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
      loader,
      isRouterLink,
      routerLinkProps,
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

    const endIcon = isLoading ? loader || <Spinner size={16} /> : undefined;

    if (isRouterLink) {
      return createElement(
        isLink
          ? 'a'
          : props.disabled
          ? typeof props.component === 'string'
            ? props.component
            : 'span'
          : RouterLink,
        {
          to: href,
          href,
          children: props.children,
          className,
          ref: ref as MutableRefObject<HTMLAnchorElement>,
          ...routerLinkProps,
        },
      );
    }

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
