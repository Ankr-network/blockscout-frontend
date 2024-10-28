import { ButtonProps } from '@mui/material';

import { NavigationItem } from '../types';

export const getExternalButtonProps = ({
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
  ...props
}: NavigationItem): ButtonProps<'a', { component: 'a' }> => ({
  ...props,
  component: 'a',
  disabled: !isEnabled && !isComingSoon && (!props.href || isDisabled),
  href: props.href,
  key: props.label,
  onClick: props.onClick,
  rel: 'noopener noreferrer',
  target: '_blank',
  variant: 'text',
});
