import { useAuth } from 'modules/auth/hooks/useAuth';
import React from 'react';
import { Button } from 'uiKit/Button';

export const DisconnectBtn = () => {
  const { dispatchDisconnect } = useAuth(1);

  return <Button onClick={dispatchDisconnect}>Disconnect</Button>;
};
