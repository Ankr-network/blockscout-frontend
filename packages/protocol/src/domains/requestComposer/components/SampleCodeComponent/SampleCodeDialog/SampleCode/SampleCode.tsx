import { useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { useSampleCodeStyles } from './useSampleCodeStyles';
import { overridenViewStyle, overridenThumbStyle } from './SampleCodeUtils';
import { ViewProps } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/CodeSnippet';
import { CopyCodeButton } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/CopyCodeButton';
import { t } from '@ankr.com/common';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

interface ISampleCodeProps {
  code: string;
  copyCode?: string;
}

export const SampleCode = ({
  code = '',
  copyCode = code,
}: ISampleCodeProps) => {
  const { isLightTheme } = useThemes();
  const { classes } = useSampleCodeStyles(isLightTheme);

  const renderThumbHorizontal = ({ style, ...props }: ViewProps) => (
    <div {...props} style={{ ...style, ...overridenThumbStyle }} />
  );

  const renderView = useCallback(
    ({ style }: ViewProps) => (
      <div style={{ ...style, ...overridenViewStyle }} />
    ),
    [],
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
        style={{ borderRadius: 24 }}
      >
        <div className={classes.codeContainer}>
          <CodeHighlighter className={classes.code} code={code} />
        </div>
      </Scrollbars>
    </div>
  );
};
