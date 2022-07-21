import { Button, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { shrinkAddress } from 'utils/shrinkAddress';

import { useAuth } from 'auth/useAuth';

export const Header = observer(() => {
  const { isLoading, handleConnect, handleDisconnect, address } = useAuth();

  return (
    <div
      style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 10 }}
    >
      {address ? (
        <Tooltip title="Disconnect">
          <Button
            type="primary"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleDisconnect}
          >
            {shrinkAddress(address)}
          </Button>
        </Tooltip>
      ) : (
        <Button
          type="primary"
          loading={isLoading}
          disabled={isLoading}
          onClick={handleConnect}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
});
