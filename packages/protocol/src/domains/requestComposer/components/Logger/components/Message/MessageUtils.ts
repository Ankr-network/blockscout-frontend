import { t } from '@ankr.com/common';

import { root } from '../../const';
import { MessageType } from '../../types';

export const getMessage = (type: MessageType) => {
  switch (type) {
    case MessageType.Error:
      return t(`${root}.prefixes.error`);

    case MessageType.Success:
      return t(`${root}.prefixes.success`);

    case MessageType.Time:
      return t(`${root}.prefixes.time`);

    case MessageType.Info:
    case MessageType.Input:
    default:
      return '';
  }
};
