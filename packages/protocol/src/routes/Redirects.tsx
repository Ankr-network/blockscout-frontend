import { Redirect, Route } from 'react-router';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

import { INDEX_PATH } from './constants';

export const Redirects = () => {
  const { isLoggedIn } = useAuth();

  const hasAccessToProjects = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const shouldRedirectToProjects = isLoggedIn && hasAccessToProjects;

  return (
    <>
      <Route exact path={INDEX_PATH}>
        <Redirect
          to={
            shouldRedirectToProjects
              ? ProjectsRoutesConfig.projects.path
              : ChainsRoutesConfig.chains.path
          }
        />
      </Route>
      <Route
        exact
        path={ChainsRoutesConfig.chainDetailsDirect.path}
        render={props => {
          const { chainId, netId } = props.match.params;
          const pathToRedirect = ChainsRoutesConfig.chainDetails.generatePath(
            chainId!,
            netId,
          );

          return <Redirect to={pathToRedirect} />;
        }}
      />
      <Route
        exact
        path={ChainsRoutesConfig.addEndpointDirect.path}
        render={props => {
          const { chainId } = props.match.params;
          const pathToRedirect = ChainsRoutesConfig.addEndpoint.generatePath(
            chainId!,
          );

          return <Redirect to={pathToRedirect} />;
        }}
      />
    </>
  );
};
