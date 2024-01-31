import { ButtonProps } from '@mui/material';

import { NavigationItem } from '../types';

export const getNotLinkButtonProps = ({
  StartIcon,
  isActive,
  isComingSoon,
  isDisabled,
  isEnabled,
  isHidden,
  isNew,
  isNotLinkItem,
  ...props
}: NavigationItem): ButtonProps => ({
  ...props,
  disabled: !isEnabled && !isComingSoon && (!props.href || isDisabled),
  href: undefined,
  key: props.label,
  onClick: props.onClick,
  variant: 'text',
});
