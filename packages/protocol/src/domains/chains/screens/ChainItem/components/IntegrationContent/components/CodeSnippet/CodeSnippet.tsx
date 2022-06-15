import React, { useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Language } from 'prism-react-renderer';

import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { ConnectionType } from '../../types';
import { CopyCodeButton } from '../CopyCodeButton';
import { ExpandButton } from '../ExpandButton';
import { titlesMap } from './const';
import { useExpander } from './hooks/useExpander';
import { useStyles } from './CodeSnippetStyles';

export interface CodeSnippetProps {
  code: string;
  language: Language;
  type: ConnectionType;
}

// export is used here to avoid a strange error of ESLint
// which thinks style prop is never used
export interface ViewProps {
  style: React.CSSProperties;
}

const overridenViewStyle: React.CSSProperties = {
  overflow: 'scroll hidden',
  position: 'relative',
};

const overridenThumbStyle: React.CSSProperties = {
  backgroundColor: '#161a1d',
  borderRadius: 6,
};

const renderThumbHorizontal = ({ style, ...props }: ViewProps) => (
  <div {...props} style={{ ...style, ...overridenThumbStyle }} />
);

export const CodeSnippet = ({ code, language, type }: CodeSnippetProps) => {
  const [isExpanded, expand] = useExpander(code);

  const classes = useStyles(isExpanded);

  const renderView = useCallback(
    ({ style }: ViewProps) => (
      <div
        className={classes.codeView}
        style={{ ...style, ...overridenViewStyle }}
      />
    ),
    [classes.codeView],
  );

  return (
    <div className={classes.codeSnippet}>
      <div className={classes.header}>
        <div className={classes.title}>{titlesMap[type]}</div>
        <CopyCodeButton code={code} />
      </div>
      <Scrollbars
        className={classes.codeContainer}
        renderThumbHorizontal={renderThumbHorizontal}
        renderView={renderView}
        style={{ height: undefined }}
      >
        <CodeHighlighter
          className={classes.code}
          code={code}
          language={language}
        />
      </Scrollbars>
      <ExpandButton
        className={classes.expandButton}
        isVisible={!isExpanded}
        onClick={expand}
      />
    </div>
  );
};
