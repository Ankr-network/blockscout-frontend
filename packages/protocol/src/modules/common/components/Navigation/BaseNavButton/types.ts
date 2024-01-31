import { NavLinkProps } from 'react-router-dom';
import { ReactElement } from 'react';
import { SvgIconProps } from '@mui/material';

export interface NavigationItem {
  StartIcon: (props: SvgIconProps) => ReactElement | null;
  href?: string;
  isActive?: NavLinkProps['isActive'];
  isComingSoon?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
  isHidden?: boolean;
  isNew?: boolean;
  isNotLinkItem?: boolean;
  label: string;
  onClick?: () => void;
}

export interface NavigationProps {
  items: NavigationItem[];
  isMobileSideBar?: boolean;
}
