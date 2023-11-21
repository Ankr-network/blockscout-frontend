import { CSSProperties } from 'react';
import { Language } from 'prism-react-renderer';

import { ConnectionType } from '../../types';

// export is used here to avoid a strange error of ESLint
// which thinks style prop is never used
export interface ViewProps {
  // eslint-disable-next-line react/no-unused-prop-types
  style: CSSProperties;
}

export interface CodeSnippetProps {
  code: string;
  language: Language;
  type: ConnectionType;
}
