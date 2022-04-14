import {
  IGlobalMenuItem,
  IGlobalMenuLinkProps,
  IGlobalMenuProject,
} from '../types';
import { ComponentType, MouseEventHandler } from 'react';
import { ANKR_MAIN_URL, ANKR_MAIN_PAGE } from '../common';

export const getLinkUrl = (url: string): string => {
  if (typeof window === 'undefined') {
    return '/';
  }

  if (window.location.href.includes(ANKR_MAIN_URL) || url.includes('http')) {
    return url;
  }

  return `${ANKR_MAIN_PAGE}${url}`;
};

export const withGlobalMenuLink = <
  T extends IGlobalMenuLinkProps & {
    disabled?: boolean;
    project: IGlobalMenuProject;
    linkItem?: IGlobalMenuItem['items'][0];
    onClick?: MouseEventHandler<HTMLElement>;
  },
>(
  Child: ComponentType<T> | undefined,
) => {
  return ({
    disabled,
    children,
    to: _to,
    linkItem,
    project,
    onClick,
    ...rest
  }: T & {
    disabled?: boolean;
    project: IGlobalMenuProject;
    linkItem?: IGlobalMenuItem['items'][0];
    onClick?: MouseEventHandler<HTMLElement>;
  }) => {
    const to = getLinkUrl(_to);

    if (
      to.startsWith('http') ||
      (linkItem?.project && project !== linkItem.project)
    ) {
      return (
        <a rel="noopener noreferrer" href={to} {...rest}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span onClick={onClick}>{children}</span>
        </a>
      );
    }

    if (disabled) {
      return <span {...rest}>{children}</span>;
    }

    let toUrl = to;

    if (project === 'protocol' && linkItem?.project) {
      toUrl = to.replace(`/${linkItem.project}`, '');
    }

    return Child ? (
      <Child to={toUrl} {...(rest as any)}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <span onClick={onClick}>{children}</span>
      </Child>
    ) : (
      <span>{children}</span>
    );
  };
};

export const isGlobalMenuItemActive = (link: string): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.location.href.includes(link);
};
