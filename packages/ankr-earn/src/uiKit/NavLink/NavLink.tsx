import classNames from 'classnames';
import { ComponentProps, ForwardedRef, forwardRef } from 'react';

import { NavLink as NavLinkUI } from 'ui';

import { QueryLoading } from 'uiKit/QueryLoading';

import { useNavLinkStyles } from './useNavLinkStyles';

type TNavLinkUIProps = ComponentProps<typeof NavLinkUI>;

interface INavLinkProps extends Omit<TNavLinkUIProps, 'variant'> {
  variant?: 'text' | 'outlined' | 'contained' | 'inline-text';
}

export const NavLink = forwardRef(
  (
    { variant = 'text', color, className, ...restProps }: INavLinkProps,
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
  ): JSX.Element => {
    const classes = useNavLinkStyles();
    const isInlineVariant = variant === 'inline-text';

    return (
      <NavLinkUI
        {...restProps}
        ref={ref}
        className={classNames(className, {
          [classes.inlineTextVariant]: isInlineVariant,
          [classes.colorSecondary]: color === 'secondary',
          [classes.colorPrimary]: color === 'primary',
        })}
        color={color}
        loader={<QueryLoading size={16} />}
        variant={isInlineVariant ? 'text' : variant}
      />
    );
  },
);
