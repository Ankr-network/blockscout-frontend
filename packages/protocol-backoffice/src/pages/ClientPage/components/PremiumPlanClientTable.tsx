import { observer } from 'mobx-react';

import PremiumClientTable from 'components/PremiumClientTable/PremiumClientTable';
import { usePremiumPlanClients } from 'stores/usePremiumPlanClients';

const PremiumPlanClientTable = observer(() => {
  const gridStore = usePremiumPlanClients();

  return <PremiumClientTable store={gridStore} />;
});

export default PremiumPlanClientTable;
