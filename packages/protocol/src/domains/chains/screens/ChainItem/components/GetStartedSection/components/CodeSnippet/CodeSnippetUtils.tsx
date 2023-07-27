import { t } from '@ankr.com/common';
import { CSSProperties } from 'react';

import { ConnectionType } from '../../types';
import { root } from '../../const';

const types = `${root}.connection-snippet.connection-types`;

export const getCodeSnippetTitle = (type: ConnectionType) => {
  switch (type) {
    case ConnectionType.HTTP:
      return t(`${types}.http`);

    case ConnectionType.WSS:
      return t(`${types}.wss`);

    default:
      return '';
  }
};

export const overridenViewStyle: CSSProperties = {
  overflow: 'scroll hidden',
  position: 'relative',
};

export const overridenThumbStyle: CSSProperties = {
  backgroundColor: '#161a1d',
  borderRadius: 6,
};
