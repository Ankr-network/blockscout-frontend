import { EndpointGroup } from 'modules/endpoints/types';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';

import { MethodsTabs } from '../../../../../SampleCodeComponent/SampleCodeDialog/MethodsTabs';
import { useMethodsTabs } from './hooks/useMethodsTabs';

export interface SolanaMethodsTabsProps {
  args: string[];
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
  title: SolanaMethod;
}

export const SolanaMethodsTabs = ({
  args,
  group,
  libraryID,
  title,
}: SolanaMethodsTabsProps) => {
  const [tabs, selectedTab] = useMethodsTabs({ args, group, libraryID, title });

  return <MethodsTabs selectedTab={selectedTab} tabs={tabs} />;
};
