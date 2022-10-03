import {
  TronChainMethod,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsTabs } from '../../components/SampleCodeComponent/SampleCodeDialog/MethodsTabs';
import { useMethodsTabsUtils } from './useMethodsTabsUtils';

interface IMethodsTabsProps {
  group: EndpointGroup;
  title: TronChainMethod;
  args: Record<string, string | number>;
  libraryID: TronLibraryID;
}

export const TronMethodsTabs = ({
  group,
  title,
  args,
  libraryID,
}: IMethodsTabsProps) => {
  const [tabs, selectedTab] = useMethodsTabsUtils(
    group,
    title,
    args,
    libraryID,
  );

  return <MethodsTabs selectedTab={selectedTab} tabs={tabs} />;
};
