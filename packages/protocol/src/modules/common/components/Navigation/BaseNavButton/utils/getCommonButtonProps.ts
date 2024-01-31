import { ButtonProps } from '@mui/material';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { NavigationItem } from '../types';

export const getCommonButtonProps = (
  {
    isActive,
    isComingSoon,
    isDisabled,
    isEnabled,
    onClick,
    href,
    label,
  }: NavigationItem,
  activeClassName: string,
): ButtonProps<NavLink, NavLinkProps> => ({
  activeClassName,
  disabled: !isEnabled && !isComingSoon && (!href || isDisabled),
  isActive,
  key: label,
  onClick,
  title: label,
  to: href ?? '',
  variant: 'text',
});
