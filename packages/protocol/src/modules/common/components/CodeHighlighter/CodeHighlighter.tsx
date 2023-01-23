import React from 'react';
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from 'prism-react-renderer';
import paleNight from 'prism-react-renderer/themes/palenight';
import { makeStyles } from 'tss-react/mui';

export interface CodeHighlighterProps {
  className?: string;
  code: string;
  language?: Language;
  theme?: PrismTheme;
}

const useStyles = makeStyles()(() => ({}));

export const CodeHighlighter = ({
  className: outerClassName,
  code,
  language = 'javascript',
  theme = paleNight,
}: CodeHighlighterProps) => {
  const { cx } = useStyles();
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={cx(outerClassName, className)}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
