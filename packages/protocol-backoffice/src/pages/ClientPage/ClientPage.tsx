import { observer } from 'mobx-react';
import { Menu } from 'antd';

import PAYGClientTable from './components/PAYGClientTable';
import PremiumClientTable from './components/PremiumPlanClientTable';
import { PageHeader } from 'components/PageHeader';
import { Tab, useInitialTab, useOnTabSelect } from './ClientPageUtils';

export const ClientPage = observer(() => {
  const initialTab = useInitialTab();

  const onSelect = useOnTabSelect();

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
      {initialTab === Tab.PAYGClients && <PAYGClientTable />}
      {initialTab === Tab.PremiumPlanClients && <PremiumClientTable />}
    </>
  );
});
