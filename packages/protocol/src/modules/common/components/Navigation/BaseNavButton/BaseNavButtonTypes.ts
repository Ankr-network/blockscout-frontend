import { ReactElement } from 'react';
import { SvgIconProps } from '@mui/material';

import { IsActive } from 'modules/layout/components/MainNavigation/utils/navigationUtils';

export interface NavigationItem {
  ActiveIcon?: (props: SvgIconProps) => ReactElement | null;
  StartIcon: (props: SvgIconProps) => ReactElement | null;
  href?: string;
  isActive?: IsActive;
  isDisabled?: boolean;
  label: string;
  onClick?: () => void;
  isComingSoon?: boolean;
  isEnabled?: boolean;
  isNew?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  loading?: boolean;
  isMobileSiderBar?: boolean;
}
