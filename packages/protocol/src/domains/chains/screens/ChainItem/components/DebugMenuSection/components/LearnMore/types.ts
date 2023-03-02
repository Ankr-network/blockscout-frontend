import { ForwardRefExoticComponent, MemoExoticComponent } from 'react';
import { ISvgIconProps } from '@ankr.com/ui/dist/icons/withSvgIcon';

export interface Card {
  Icon: MemoExoticComponent<ForwardRefExoticComponent<ISvgIconProps>>;
  descriptions: string[];
  link: string;
  linkText: string;
  title: string;
}
