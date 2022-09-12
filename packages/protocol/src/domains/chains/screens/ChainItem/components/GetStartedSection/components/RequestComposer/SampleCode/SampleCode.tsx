import React, { useCallback, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { ViewProps } from '../../CodeSnippet';
import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { useSampleCodeStyles } from './useSampleCodeStyles';
import { overridenViewStyle, overridenThumbStyle } from './SampleCodeUtils';
import { EVMMethod, LibraryID } from 'domains/requestComposer/constants';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/RPCCallsConfig';
import { CopyCodeButton } from '../../CopyCodeButton';
import { t } from 'common';
import { EndpointGroup } from 'modules/endpoints/types';

interface ISampleCodeProps {
  group: EndpointGroup;
  title: EVMMethod;
  args: string[];
  libraryID: LibraryID;
}

export const SampleCode = ({
  group,
  title,
  args,
  libraryID,
}: ISampleCodeProps) => {
  const classes = useSampleCodeStyles();

  const httpUrl = useMemo(() => group.urls[0].rpc, [group]);
  const wssUrl = useMemo(() => group.urls[0]?.ws ?? '', [group]);

  const code = useMemo(
    () =>
      RPC_CALLS_CONFIG[title]?.[libraryID]?.codeSample(
        httpUrl,
        wssUrl,
        ...args,
      ),
    [httpUrl, wssUrl, title, args, libraryID],
  );

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
