import { NavLinkProps } from 'react-router-dom';
import { ReactElement } from 'react';
import { SvgIconProps } from '@mui/material';

export interface NavigationItem {
  ActiveIcon?: (props: SvgIconProps) => ReactElement | null;
  StartIcon: (props: SvgIconProps) => ReactElement | null;
  href?: string;
  isActive?: NavLinkProps['isActive'];
  isDisabled?: boolean;
  isHidden?: boolean;
  label: string;
  onClick?: () => void;
  isComingSoon?: boolean;
  isEnabled?: boolean;
  isNotLinkItem?: boolean;
  isNew?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  isMobileSideBar?: boolean;
}
