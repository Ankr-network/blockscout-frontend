import { Route, Switch } from 'react-router-dom';
import { DefaultLayout } from './modules/layout/components/DefautLayout';

export function Routes() {
  return (
    <Switch>
      <Route render={() => <DefaultLayout></DefaultLayout>} />
    </Switch>
  );
}
