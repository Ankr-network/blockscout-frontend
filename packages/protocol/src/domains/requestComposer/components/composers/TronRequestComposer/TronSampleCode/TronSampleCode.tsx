import { useMemo } from 'react';

import { TRON_CALL_CONFIG } from 'domains/requestComposer/utils/tron/RPCCallsConfig';
import { EndpointGroup } from 'modules/endpoints/types';
import { SampleCode } from 'domains/requestComposer/components/SampleCodeComponent/SampleCodeDialog/SampleCode';
import {
  TronChainMethod,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';

import { formatParameters, getCopyCode } from './TronSampleCodeUtils';

interface ISampleCodeProps {
  group: EndpointGroup;
  title: TronChainMethod;
  args: Record<string, string | number>;
  libraryID: TronLibraryID;
}

export const TronSampleCode = ({
  args,
  group,
  libraryID,
  title,
}: ISampleCodeProps) => {
  const httpUrl = useMemo(() => group.urls[0].rest, [group]);

  const code = useMemo(() => {
    const argResult = formatParameters(title, args);

    return TRON_CALL_CONFIG[title]?.[libraryID]?.codeSample(httpUrl, argResult);
  }, [httpUrl, title, args, libraryID]);

  return <SampleCode code={code} copyCode={getCopyCode(code)} />;
};
