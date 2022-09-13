import { ReactElement } from 'react';
import { SvgIconProps } from '@material-ui/core';

import { IsActive } from 'modules/layout/components/MainNavigation/MainNavigationUtils';

export interface NavigationItem {
  label: string;
  href?: string;
  StartIcon: (props: SvgIconProps) => ReactElement | null;
  ActiveIcon?: (props: SvgIconProps) => ReactElement | null;
  isDisabled?: boolean;
  isActive?: IsActive;
}

export interface NavigationProps {
  items: NavigationItem[];
  loading?: boolean;
}
