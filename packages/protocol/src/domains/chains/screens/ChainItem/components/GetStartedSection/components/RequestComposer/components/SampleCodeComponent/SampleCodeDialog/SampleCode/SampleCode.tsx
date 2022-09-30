import { useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { useSampleCodeStyles } from './useSampleCodeStyles';
import { overridenViewStyle, overridenThumbStyle } from './SampleCodeUtils';
import { ViewProps } from '../../../../../CodeSnippet';
import { CopyCodeButton } from '../../../../../CopyCodeButton';
import { t } from 'common';

interface ISampleCodeProps {
  code: string;
}

export const SampleCode = ({ code = '' }: ISampleCodeProps) => {
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
          code={code}
          text={t('chain-item.request-composer.sample-code.copy')}
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
