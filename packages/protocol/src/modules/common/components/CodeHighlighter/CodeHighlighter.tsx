import React from 'react';
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from 'prism-react-renderer';
import classNames from 'classnames';
import paleNight from 'prism-react-renderer/themes/palenight';

export interface CodeHighlighterProps {
  className?: string;
  code: string;
  language?: Language;
  theme?: PrismTheme;
}

export const CodeHighlighter = ({
  className: outerClassName,
  code,
  language = 'javascript',
  theme = paleNight,
}: CodeHighlighterProps) => {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={classNames(outerClassName, className)}>
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
