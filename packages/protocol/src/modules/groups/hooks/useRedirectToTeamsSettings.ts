import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { ESettingsContentType } from 'domains/userSettings/types';

import { useContinueTeamCreationFlow } from './useContinueTeamCreationFlow';

export const useRedirectToTeamsSettings = () => {
  const history = useHistory();

  const { canContinueTeamCreationFlow } = useContinueTeamCreationFlow();

  useEffect(() => {
    if (canContinueTeamCreationFlow) {
      history.push(
        UserSettingsRoutesConfig.settings.generatePath(
          ESettingsContentType.Teams,
        ),
      );
    }
  }, [canContinueTeamCreationFlow, history]);
};
