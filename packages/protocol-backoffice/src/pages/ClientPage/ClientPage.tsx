import { Menu } from 'antd';
import { PageHeader } from 'components/PageHeader';
import { observer } from 'mobx-react';
import { useClientEmailsStore } from 'stores/ClientEmailsStore';
import { Tab, useInitialTab, useOnTabSelect } from './ClientPageUtils';
import PAYGClientTable from './components/PAYGClientTable';
import PremiumClientTable from './components/PremiumPlanClientTable';

export const ClientPage = observer(() => {
  const initialTab = useInitialTab();

  const onSelect = useOnTabSelect();

  const emailStore = useClientEmailsStore();

  return (
    <>
      <PageHeader title="Client Page" />
      <div>
        <Menu selectedKeys={[initialTab]} onSelect={onSelect} mode="horizontal">
          <Menu.Item key={Tab.PAYGClients}>PAYG Clients</Menu.Item>
          <Menu.Item key={Tab.PremiumPlanClients}>
            Premium Plan Clients
          </Menu.Item>
        </Menu>
      </div>
      <br />
      {initialTab === Tab.PAYGClients && (
        <PAYGClientTable emailStore={emailStore} />
      )}
      {initialTab === Tab.PremiumPlanClients && (
        <PremiumClientTable emailStore={emailStore} />
      )}
    </>
  );
});
