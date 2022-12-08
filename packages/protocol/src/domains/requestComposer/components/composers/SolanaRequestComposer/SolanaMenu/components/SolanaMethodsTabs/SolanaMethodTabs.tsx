import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsTabs } from '../../../../../SampleCodeComponent/SampleCodeDialog/MethodsTabs';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { useMethodsTabs } from './hooks/useMethodsTabs';

export interface SolanaMethodsTabsProps {
  args: string[];
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
  title: SolanaMethod;
}

export const SolanaMethodsTabs = ({
  group,
  title,
  args,
  libraryID,
}: SolanaMethodsTabsProps) => {
  const [tabs, selectedTab] = useMethodsTabs({ args, group, libraryID, title });

  return <MethodsTabs selectedTab={selectedTab} tabs={tabs} />;
};
