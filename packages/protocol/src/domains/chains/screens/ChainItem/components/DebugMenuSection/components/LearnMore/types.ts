import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ISvgIconProps } from '@ankr.com/ui/dist/icons/withSvgIcon';

export interface Card {
  Icon: ForwardRefExoticComponent<
    Omit<ISvgIconProps, 'ref'> & RefAttributes<any>
  >;
  descriptions: string[];
  link: string;
  linkText: string;
  title: string;
}
