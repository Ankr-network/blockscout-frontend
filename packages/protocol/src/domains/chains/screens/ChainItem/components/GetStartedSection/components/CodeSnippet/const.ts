import { ConnectionType } from '../../types';
import { root } from '../../const';
import { t } from '@ankr.com/common';

const types = `${root}.connection-snippet.connection-types`;

export const titlesMap: Record<ConnectionType, string> = {
  [ConnectionType.HTTP]: t(`${types}.http`),
  [ConnectionType.WSS]: t(`${types}.wss`),
};
