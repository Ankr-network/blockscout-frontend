import {
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { EndpointGroup } from 'modules/endpoints/types';

import { MethodsTabs } from '../../../SampleCodeComponent/SampleCodeDialog/MethodsTabs';
import { useMethodsTabsUtils } from './useMethodsTabsUtils';

interface IMethodsTabsProps {
  group: EndpointGroup;
  title: NearMethod;
  args: string[];
  libraryID: NearLibraryID;
}

export const NearMethodsTabs = ({
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
