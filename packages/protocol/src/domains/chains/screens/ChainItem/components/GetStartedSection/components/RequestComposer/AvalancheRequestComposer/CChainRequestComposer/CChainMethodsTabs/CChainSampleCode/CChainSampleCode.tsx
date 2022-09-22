import { useMemo } from 'react';

import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/c-chain/RPCCallsConfig';
import { EndpointGroup } from 'modules/endpoints/types';
import { SampleCode } from '../../../../components/SampleCodeComponent/SampleCodeDialog/SampleCode';
import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';

interface ISampleCodeProps {
  group: EndpointGroup;
  title: CChainMethod;
  args: string[];
  libraryID: AvalancheLibraryID;
}

export const CChainSampleCode = ({
  group,
  title,
  args,
  libraryID,
}: ISampleCodeProps) => {
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

  return <SampleCode code={code} />;
};
