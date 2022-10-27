import React, { useMemo } from 'react';

import { HARMONY_CALL_CONFIG } from 'domains/requestComposer/utils/harmony/RPCCallConfig';
import { EndpointGroup } from 'modules/endpoints/types';
import { SampleCode } from '../../components/SampleCodeComponent/SampleCodeDialog/SampleCode';
import {
  HarmonyMethod,
  HarmonyLibraryID,
} from 'domains/requestComposer/constants/harmony';
import { formatParameters } from './HarmonySampleCodeUtils';

interface ISampleCodeProps {
  group: EndpointGroup;
  title: HarmonyMethod;
  args: Record<string, string | number>;
  libraryID: HarmonyLibraryID;
}

export const HarmonySampleCode = ({
  group,
  title,
  args,
  libraryID,
}: ISampleCodeProps) => {
  const httpUrl = useMemo(() => group.urls[0].rpc, [group]);

  const code = useMemo(() => {
    const argList = HARMONY_CALL_CONFIG[title]?.[libraryID]?.args;
    const argResult: any = formatParameters(args, title, argList);
    return HARMONY_CALL_CONFIG[title]?.[libraryID]?.codeSample(
      httpUrl,
      title,
      argResult,
    );
  }, [httpUrl, title, args, libraryID]);

  return <SampleCode code={code} />;
};
