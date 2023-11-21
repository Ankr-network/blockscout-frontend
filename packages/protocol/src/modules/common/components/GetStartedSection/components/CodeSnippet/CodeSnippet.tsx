import { useCallback, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { CopyCodeButton } from '../CopyCodeButton';
import { ExpandButton } from '../ExpandButton';
import { useExpander } from './hooks/useExpander';
import { useStyles } from './CodeSnippetStyles';
import {
  getCodeSnippetTitle,
  overridenThumbStyle,
  overridenViewStyle,
} from './CodeSnippetUtils';
import { CodeSnippetProps, ViewProps } from './CodeSnippetTypes';

const renderThumbHorizontal = ({ style, ...props }: ViewProps) => (
  <div {...props} style={{ ...style, ...overridenThumbStyle }} />
);

export const CodeSnippet = ({ code, language, type }: CodeSnippetProps) => {
  const { isLightTheme } = useThemes();

  const [isExpanded, expand] = useExpander(code);

  const { classes } = useStyles({ isExpanded, isLightTheme });

  const renderView = useCallback(
    ({ style }: ViewProps) => (
      <div
        className={classes.codeView}
        style={{ ...style, ...overridenViewStyle }}
      />
    ),
    [classes.codeView],
  );

  const title = useMemo(() => getCodeSnippetTitle(type), [type]);

  return (
    <div className={classes.codeSnippet}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
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
