import { BillingIcon, NewsIcon, SystemIcon } from '@ankr.com/ui';
import { ENotificationCategory } from 'multirpc-sdk';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ISvgIconProps } from '@ankr.com/ui/dist/icons/withSvgIcon';

type Category = Exclude<ENotificationCategory, ENotificationCategory.UNKNOWN>;
type Icon = ForwardRefExoticComponent<
  Omit<ISvgIconProps, 'ref'> & RefAttributes<any>
>;

export const iconsMap: Record<Category, Icon> = {
  [ENotificationCategory.BILLING]: BillingIcon,
  [ENotificationCategory.NEWS]: NewsIcon,
  [ENotificationCategory.SYSTEM]: SystemIcon,
};
