import {
  CONTENT_QUERY_PARAM_NAME,
  EIndexContent,
  INDEX_PATH,
} from 'routes/constants';
import { useHistory } from 'react-router';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useAppSelector } from 'store/useAppSelector';
import { selectCanContinueTeamCreationFlow } from 'modules/groups/store/selectors';

export const useShouldRedirectToProjects = () => {
  const { isLoggedIn } = useAuth();

  const hasAccessToProjects = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const { location } = useHistory();

  const params = new URLSearchParams(location.search);
  const isIndexPath = location.pathname === INDEX_PATH;

  const hasEndpointsContent = params.has(
    CONTENT_QUERY_PARAM_NAME,
    EIndexContent.Endpoints,
  );

  const shouldRedirectToSettings = useAppSelector(
    selectCanContinueTeamCreationFlow,
  );

  const shouldRedirectToProjects =
    isLoggedIn &&
    hasAccessToProjects &&
    !hasEndpointsContent &&
    isIndexPath &&
    !shouldRedirectToSettings;

  return shouldRedirectToProjects;
};
