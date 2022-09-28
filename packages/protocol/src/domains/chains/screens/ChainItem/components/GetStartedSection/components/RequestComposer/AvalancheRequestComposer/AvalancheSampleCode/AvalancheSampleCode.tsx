import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { AvalancheLibraryID } from 'domains/requestComposer/constants/avalanche';
import { SampleCode } from '../../components/SampleCodeComponent/SampleCodeDialog/SampleCode';

interface ISampleCodeProps<T> {
  group: EndpointGroup;
  title: T;
  args: string[];
  libraryID: AvalancheLibraryID;
  config: any;
}

export function AvalancheSampleCode<T>({
  group,
  title,
  args,
  libraryID,
  config,
}: ISampleCodeProps<T>) {
  const httpUrl = useMemo(() => group.urls[0].rpc, [group]);
  const wssUrl = useMemo(() => group.urls[0]?.ws ?? '', [group]);

  const code = useMemo(
    () => config[title]?.[libraryID]?.codeSample(httpUrl, wssUrl, ...args),
    [httpUrl, wssUrl, title, args, libraryID, config],
  );

  return <SampleCode code={code} />;
}
