import ClientTable from 'components/ClientTable/ClientTable';
import { PageHeader } from 'components/PageHeader';
import { observer } from 'mobx-react';
import { useClients } from 'stores/useClients';

export const ClientPage = observer(() => {
  const gridStore = useClients();

  return (
    <>
      <PageHeader title="Client Page" />

      <ClientTable store={gridStore} />
    </>
  );
});
