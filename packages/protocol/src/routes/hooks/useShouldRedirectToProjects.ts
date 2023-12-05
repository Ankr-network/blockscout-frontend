import {
  CONTENT_QUERY_PARAM,
  INDEX_PATH,
  IndexContent,
} from 'routes/constants';
import { useHistory } from 'react-router';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

export const useShouldRedirectToProjects = () => {
  const { isLoggedIn } = useAuth();

  const hasAccessToProjects = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const { location } = useHistory();

  const params = new URLSearchParams(location.search);
  const isIndexPath = location.pathname === INDEX_PATH;

  const hasEndpointsContent = params.has(
    CONTENT_QUERY_PARAM,
    // ts compiler throws an error that the second argument is not allowed
    // but it is actually allowed.
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/has
    // @ts-ignore
    IndexContent.Endpoints,
  );

  const shouldRedirectToProjects =
    isLoggedIn && hasAccessToProjects && !hasEndpointsContent && isIndexPath;

  return shouldRedirectToProjects;
};
