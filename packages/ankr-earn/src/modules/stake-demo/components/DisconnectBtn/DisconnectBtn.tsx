import { useAuth } from 'modules/auth/hooks/useAuth';
import { requiredProvider } from 'modules/stake-demo/const';
import React from 'react';
import { Button } from 'uiKit/Button';

export const DisconnectBtn = () => {
  const { dispatchDisconnect } = useAuth(requiredProvider);

  return <Button onClick={dispatchDisconnect}>Disconnect</Button>;
};
