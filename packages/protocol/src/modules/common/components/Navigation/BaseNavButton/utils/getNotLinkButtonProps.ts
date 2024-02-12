import { ButtonProps } from '@mui/material';

import { NavigationItem } from '../types';

export const getNotLinkButtonProps = (
  {
    StartIcon,
    isActive,
    isComingSoon,
    isDisabled,
    isEnabled,
    isHidden,
    isNew,
    isNotLinkItem,
    onClick,
    onAccessDeniedClick,
    ...props
  }: NavigationItem,
  hasAccess: boolean,
): ButtonProps => ({
  ...props,
  disabled: !isEnabled && !isComingSoon && (!props.href || isDisabled),
  href: undefined,
  key: props.label,
  onClick: hasAccess ? onClick : onAccessDeniedClick,
  variant: 'text',
});
