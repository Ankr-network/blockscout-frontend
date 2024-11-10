import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { selectUserEndpointToken } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export const useUserEndpointToken = () => {
  const userEndpointToken = useAppSelector(selectUserEndpointToken);
  const { tokenIndex } = useTokenManagerConfigSelector();
  const { isGroupSelected, selectedGroupAddress: group } =
    useSelectedUserGroup();

  const { jwts, loading } = useJWTs({ group, skipFetching: true });
  const { groupToken } = useGroupJwtToken();

  // for project details page we should use userEndpointToken from url
  const { projectId } = ProjectsRoutesConfig.project.useParams();

  if (projectId) {
    return projectId;
  }

  if (loading) {
    return undefined;
  }

  if (jwts && tokenIndex === PRIMARY_TOKEN_INDEX && isGroupSelected) {
    return groupToken?.jwtToken;
  }

  if (tokenIndex === PRIMARY_TOKEN_INDEX || !tokenIndex) {
    return userEndpointToken;
  }

  const selectedToken = jwts.find(
    token => token.index === tokenIndex,
  )?.userEndpointToken;

  return selectedToken;
};
