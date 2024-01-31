import { OverlaySpinner } from '@ankr.com/ui';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectSortedUserGroupsWithoutPersonal,
  selectUserGroupLoading,
} from 'domains/userGroup/store';
import { CreateTeamForm } from 'modules/groups/components/CreateTeamForm';
import { useRedirectForSmallDevices } from 'hooks/useRedirectForSmallDevices';

import { TeamsList } from '../TeamsList';

export const Teams = () => {
  useRedirectForSmallDevices();

  const userGroups = useAppSelector(selectSortedUserGroupsWithoutPersonal);

  const isLoading = useAppSelector(selectUserGroupLoading);

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (userGroups.length === 0) {
    return <CreateTeamForm />;
  }

  return <TeamsList userGroups={userGroups} />;
};
