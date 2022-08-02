import {
  ITabItem,
  Tabs as BaseTabs,
} from 'modules/delegate-stake/components/Tabs';

interface ITabProps {
  tabs: ITabItem[];
  activeTab: string;
  handleChangeTab(newTab: string): void;
}

export const Tabs = ({
  tabs,
  activeTab,
  handleChangeTab,
}: ITabProps): JSX.Element => {
  return (
    <BaseTabs
      activeTab={activeTab}
      handleChangeTab={handleChangeTab}
      tabs={tabs}
    />
  );
};
