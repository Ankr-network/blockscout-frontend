import { EVMMethod, EVMLibraryID } from 'domains/requestComposer/constants';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodsTabs } from '../../../SampleCodeComponent/SampleCodeDialog/MethodsTabs';
import { useMethodsTabsUtils } from './useMethodsTabsUtils';

interface IMethodsTabsProps {
  group: EndpointGroup;
  title: EVMMethod;
  args: string[];
  libraryID: EVMLibraryID;
}

export const EVMMethodsTabs = ({
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
