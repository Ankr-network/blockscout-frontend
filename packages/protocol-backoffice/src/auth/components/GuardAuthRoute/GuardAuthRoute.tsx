import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Spinner } from 'ui';
import { useAuthStore } from 'stores/AuthStore';

export const GuardAuthRoute = observer((props: RouteProps) => {
  const store = useAuthStore();

  if (store.isLoading || !store.isLoaded) {
    return <Spinner />;
  }

  return <Route {...props} />;
});
