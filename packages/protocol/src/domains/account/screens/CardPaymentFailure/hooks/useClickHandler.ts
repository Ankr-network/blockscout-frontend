import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

export const useClickHandler = (isWhitelistReason: boolean) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(
      push(
        isWhitelistReason
          ? ProjectsRoutesConfig.newProject.generatePath()
          : AccountRoutesConfig.accountDetails.generatePath(),
      ),
    );
  }, [dispatch, isWhitelistReason]);
};
