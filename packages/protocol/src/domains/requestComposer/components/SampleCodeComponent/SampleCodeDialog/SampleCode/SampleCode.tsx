import { useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { useSampleCodeStyles } from './useSampleCodeStyles';
import { overridenViewStyle, overridenThumbStyle } from './SampleCodeUtils';
import { ViewProps } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/CodeSnippet';
import { CopyCodeButton } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/CopyCodeButton';
import { t } from '@ankr.com/common';

interface ISampleCodeProps {
  code: string;
  copyCode?: string;
}

export const SampleCode = ({
  code = '',
  copyCode = code,
}: ISampleCodeProps) => {
  const classes = useSampleCodeStyles();

  const renderThumbHorizontal = ({ style, ...props }: ViewProps) => (
    <div {...props} style={{ ...style, ...overridenThumbStyle }} />
  );

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
    <div className={classes.root}>
      <div className={classes.copyButton}>
        <CopyCodeButton
          code={copyCode}
          text={t('request-composer.sample-code.copy')}
        />
      </div>
      <Scrollbars
        renderThumbHorizontal={renderThumbHorizontal}
        renderView={renderView}
      >
        <div className={classes.codeContainer}>
          <CodeHighlighter className={classes.code} code={code} />
        </div>
      </Scrollbars>
    </div>
  );
};
