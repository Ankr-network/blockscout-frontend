import { MobXProviderContext } from 'mobx-react';
import React from 'react';

import { authStore } from './AuthStore';

export const useStores = () => {
  return React.useContext(MobXProviderContext);
};

export const useMultiRpcSdk = () => {
  return authStore.service;
};
