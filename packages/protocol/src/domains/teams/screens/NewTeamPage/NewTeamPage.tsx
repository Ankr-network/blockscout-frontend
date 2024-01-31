import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';
import { Redirect } from 'react-router-dom';

import { TeamsRoutesConfig } from 'domains/teams/Routes';
import { CreateTeamForm } from 'modules/groups/components/CreateTeamForm';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectIsGroupCreationAllowanceLoading,
  selectIsGroupCreationAllowed,
} from 'domains/userGroup/store';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { ESettingsContentType } from 'domains/userSettings/types';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { useNewTeamPageStyles } from './useNewTeamPageStyles';

export const NewTeamPage = () => {
  useSetBreadcrumbs([
    {
      title: t(TeamsRoutesConfig.newTeam.breadcrumbs),
    },
  ]);

  const { classes } = useNewTeamPageStyles();

  const isLoading = useAppSelector(selectIsGroupCreationAllowanceLoading);
  const isGroupsCreationAllowed = useAppSelector(selectIsGroupCreationAllowed);

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (!isLoading && !isGroupsCreationAllowed) {
    return (
      <Redirect
        to={UserSettingsRoutesConfig.settings.generatePath(
          ESettingsContentType.Teams,
        )}
      />
    );
  }

  return (
    <div className={classes.newTeamPage}>
      <CreateTeamForm />
    </div>
  );
};
