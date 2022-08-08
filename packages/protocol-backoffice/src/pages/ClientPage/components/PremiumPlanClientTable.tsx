import PremiumClientTable from 'components/PremiumClientTable/PremiumClientTable';
import { observer } from 'mobx-react';
import { ClientEmailsStore } from 'stores/ClientEmailsStore';
import { usePremiumPlanClients } from 'stores/usePremiumPlanClients';

interface IPremiumPlanClientTableProps {
  emailStore: ClientEmailsStore;
}

const PremiumPlanClientTable = observer(
  ({ emailStore }: IPremiumPlanClientTableProps) => {
    const gridStore = usePremiumPlanClients();

    return <PremiumClientTable store={gridStore} emailStore={emailStore} />;
  },
);

export default PremiumPlanClientTable;
