import { TabsManager } from 'uiKit/TabsManager';
import { useTabs } from 'modules/common/hooks/useTabs';

import { CodeType, tabs } from './const';

export interface TabsProps {
  setCodeType: (codeType: CodeType) => void;
  classNameTabsWrapper?: string;
  classNameTab?: string;
}

export const CodeSampleTabs = ({
  classNameTab,
  classNameTabsWrapper,
  setCodeType,
}: TabsProps) => {
  const [processedTabs, selectedTab] = useTabs({
    tabs,
    onTabSelect: setCodeType,
  });

  return (
    <TabsManager<CodeType>
      selectedTab={selectedTab}
      tabs={processedTabs}
      classNameTabsWrapper={classNameTabsWrapper}
      classNameTab={classNameTab}
    />
  );
};
