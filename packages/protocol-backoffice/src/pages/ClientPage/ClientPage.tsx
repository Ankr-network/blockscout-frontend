import { Menu } from 'antd';
import { PageHeader } from 'components/PageHeader';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

import { useClientEmailsStore } from 'stores/ClientEmailsStore';
import { usePremiumPlanClients } from 'stores/usePremiumPlanClients';
import { Tab, useInitialTab, useOnTabSelect } from './ClientPageUtils';
import PAYGClientTable from './components/PAYGClientTable';
import PremiumClientTable from 'components/PremiumClientTable/PremiumClientTable';
import { SearchClientsInput } from './components/SearchClientsInput';
import { CreateClientButton } from './components/CreateClientButton';

export const ClientPage = observer(() => {
  const initialTab = useInitialTab();

  const onSelect = useOnTabSelect();

  const emailStore = useClientEmailsStore();

  useEffect(() => {
    emailStore.fetchAllEmails();
  }, [emailStore]);

  const gridStorePremiumPlanClients = usePremiumPlanClients();

  return (
    <>
      <PageHeader title="Client Page" />
      <CreateClientButton />
      <SearchClientsInput
        emailStore={emailStore}
        gridStore={gridStorePremiumPlanClients}
      />
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
        <PremiumClientTable
          store={gridStorePremiumPlanClients}
          emailStore={emailStore}
        />
      )}
    </>
  );
});
