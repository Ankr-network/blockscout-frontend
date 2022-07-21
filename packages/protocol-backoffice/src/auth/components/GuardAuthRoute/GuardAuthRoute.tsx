import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Spinner } from 'ui';
import { useAuthStore } from 'stores/AuthStore';

export const GuardAuthRoute = observer((props: RouteProps) => {
  const { isLoading, isLoaded, address } = useAuthStore();

  if (!address) {
    return null;
  }

  if (isLoading || !isLoaded) {
    return <Spinner />;
  }

  return <Route {...props} />;
});
