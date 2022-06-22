import { observer } from 'mobx-react';

import { useMultiRpcSdk } from 'stores';
import { useLocalGridStore } from 'stores/LocalGridStore';
import JwtTokenTable from 'components/JwtTokenTable/JwtTokenTable';

export const JwtTokenNav = observer(() => {
  const api = useMultiRpcSdk().getApiGateway();
  const gridStore = useLocalGridStore((offset, limit) => {
    return api.getJwtTokens(undefined, offset, limit);
  });

  return (
    <div>
      <JwtTokenTable store={gridStore} />
    </div>
  );
});
