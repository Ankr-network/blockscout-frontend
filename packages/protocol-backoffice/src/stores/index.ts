import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import { MultiRpcSdk } from 'multirpc-sdk';

import { MultiService } from 'api/MultiService';

export const useStores = () => {
  return React.useContext(MobXProviderContext);
};

const { service } = MultiService.getInstance();

export const useMultiRpcSdk = (): MultiRpcSdk => {
  return service;
};
