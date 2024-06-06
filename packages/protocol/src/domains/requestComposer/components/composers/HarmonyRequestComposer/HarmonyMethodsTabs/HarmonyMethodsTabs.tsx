import {
  HarmonyLibraryID,
  HarmonyMethod,
} from 'domains/requestComposer/constants/harmony';
import { EndpointGroup } from 'modules/endpoints/types';

import { MethodsTabs } from '../../../SampleCodeComponent/SampleCodeDialog/MethodsTabs';
import { useMethodsTabsUtils } from './useMethodsTabsUtils';

interface IHarmonyMethodsTabsProps {
  group: EndpointGroup;
  title: HarmonyMethod;
  args: Record<string, string | number>;
  libraryID: HarmonyLibraryID;
}

export const HarmonyMethodsTabs = ({
  args,
  group,
  libraryID,
  title,
}: IHarmonyMethodsTabsProps) => {
  const [tabs, selectedTab] = useMethodsTabsUtils({
    group,
    title,
    args,
    libraryID,
  });

  return <MethodsTabs selectedTab={selectedTab} tabs={tabs} />;
};
