import { observer } from 'mobx-react';

import ClientTable from 'components/ClientTable/ClientTable';
import { useClients } from 'stores/useClients';

const PAYGClientTable = observer(() => {
  const gridStore = useClients();

  return <ClientTable store={gridStore} />;
});

export default PAYGClientTable;
