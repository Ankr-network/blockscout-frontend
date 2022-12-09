import { useMemo } from 'react';

import { EVMMethod, EVMLibraryID } from 'domains/requestComposer/constants';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/RPCCallsConfig';
import { EndpointGroup } from 'modules/endpoints/types';
import { SampleCode } from '../../../../SampleCodeComponent/SampleCodeDialog/SampleCode';

interface ISampleCodeProps {
  group: EndpointGroup;
  title: EVMMethod;
  args: string[];
  libraryID: EVMLibraryID;
}

export const EVMSampleCode = ({
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
