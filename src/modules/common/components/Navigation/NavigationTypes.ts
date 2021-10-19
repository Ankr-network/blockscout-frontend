import { ReactElement } from 'react';
import { SvgIconProps } from '@material-ui/core';

export interface NavigationItem {
  label: string;
  href?: string;
  StartIcon: (props: SvgIconProps) => ReactElement;
  EndIcon?: (props: SvgIconProps) => ReactElement;
  isDisabled?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
}
