import { observer } from 'mobx-react';

import { ProposalTable } from 'components/ProposalTable';

export const ProposalNav = observer(() => {
  return <ProposalTable />;
});
