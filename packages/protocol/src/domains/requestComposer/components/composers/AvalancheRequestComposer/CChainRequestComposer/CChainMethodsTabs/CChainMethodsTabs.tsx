import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { EndpointGroup } from 'modules/endpoints/types';

import { MethodsTabs } from '../../../../SampleCodeComponent/SampleCodeDialog/MethodsTabs';
import { useMethodsTabsUtils } from './useMethodsTabsUtils';

interface IMethodsTabsProps {
  group: EndpointGroup;
  title: CChainMethod;
  args: string[];
  libraryID: AvalancheLibraryID;
}

export const CChainMethodsTabs = ({
  args,
  group,
  libraryID,
  title,
}: IMethodsTabsProps) => {
  const [tabs, selectedTab] = useMethodsTabsUtils({
    group,
    title,
    args,
    libraryID,
  });

  return <MethodsTabs selectedTab={selectedTab} tabs={tabs} />;
};
