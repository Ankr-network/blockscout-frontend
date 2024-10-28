import { ButtonProps } from '@mui/material';

import { NavigationItem } from '../types';

export const getNotLinkButtonProps = (
  {
    StartIcon,
    amount,
    blockName,
    isActive,
    isComingSoon,
    isDisabled,
    isEnabled,
    isHidden,
    isNew,
    isNotLinkItem,
    onAccessDeniedClick,
    onClick,
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
