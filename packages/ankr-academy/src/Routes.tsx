import { Redirect, Route, Switch } from 'react-router-dom';
import { AcademyRoutes, AcademyRoutesConfig } from './domains/academy/Routes';

export function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
      >
        <Redirect to={AcademyRoutesConfig.academy.path} />
      </Route>
      <Route
        exact
        path={[AcademyRoutesConfig.academy.path]}
        render={() => <AcademyRoutes />}
      />
    </Switch>
  );
}
