import { Notification, OctagonWarning, TriangleWarning } from '@ankr.com/ui';

import { AccountIcon } from 'domains/account/types';

const iconsMap: Record<AccountIcon, JSX.Element> = {
  [AccountIcon.INFO]: <Notification />,
  [AccountIcon.ERROR]: <OctagonWarning />,
  [AccountIcon.WARNING]: <TriangleWarning />,
};

export const getIcon = (iconType?: AccountIcon) =>
  iconType ? iconsMap[iconType] : undefined;
