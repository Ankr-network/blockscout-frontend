import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { RPCCallsConfig } from 'domains/requestComposer/types/solana';
import { SampleCode } from '../../../../components/SampleCodeComponent/SampleCodeDialog/SampleCode';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';

export interface SolanaSampleCodeProps {
  args: string[];
  config: RPCCallsConfig;
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
  title: SolanaMethod;
}

export const SolanaSampleCode = ({
  args,
  config,
  group,
  libraryID,
  title,
}: SolanaSampleCodeProps) => {
  const httpUrl = useMemo(() => group.urls[0].rpc, [group]);
  const wssUrl = useMemo(() => group.urls[0]?.ws ?? '', [group]);

  const code = useMemo(
    () => config[title]?.[libraryID]?.codeSample(httpUrl, wssUrl, ...args),
    [httpUrl, wssUrl, title, args, libraryID, config],
  );

  return <SampleCode code={code} />;
};
