import ClientTable from 'components/ClientTable/ClientTable';
import { observer } from 'mobx-react';
import { ClientEmailsStore } from 'stores/ClientEmailsStore';
import { useClients } from 'stores/useClients';

interface IPAYGClientTableProps {
  emailStore: ClientEmailsStore;
}

const PAYGClientTable = observer(({ emailStore }: IPAYGClientTableProps) => {
  const gridStore = useClients();

  return <ClientTable store={gridStore} emailStore={emailStore} />;
});

export default PAYGClientTable;
