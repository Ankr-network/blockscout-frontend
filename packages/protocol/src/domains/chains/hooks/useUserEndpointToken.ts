import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export const useUserEndpointToken = () => {
  const { workerTokenData } = useAuth();
  const { tokenIndex } = useTokenManagerConfigSelector();
  const { isGroupSelected, selectedGroupAddress: group } =
    useSelectedUserGroup();

  const { isLoading, jwts } = useJWTs({ group, skipFetching: true });
  const { groupToken } = useGroupJwtToken();

  // for project details page we should use userEndpointToken from url
  const { projectId: userEndpointToken } =
    ProjectsRoutesConfig.project.useParams();

  if (userEndpointToken) {
    return userEndpointToken;
  }

  if (isLoading) {
    return undefined;
  }

  if (jwts && tokenIndex === PRIMARY_TOKEN_INDEX && isGroupSelected) {
    return groupToken?.jwtToken;
  }

  if (tokenIndex === PRIMARY_TOKEN_INDEX || !tokenIndex) {
    return workerTokenData?.userEndpointToken;
  }

  const selectedToken = jwts.find(
    token => token.index === tokenIndex,
  )?.userEndpointToken;

  return selectedToken;
};
