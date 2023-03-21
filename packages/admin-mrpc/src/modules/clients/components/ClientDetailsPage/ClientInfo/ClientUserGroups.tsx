import { Spinner } from 'ui';
import { Paper, Typography } from '@mui/material';
import { UserGroupsList } from 'modules/groups/actions/getUserGroups';

interface ClientUserGroupsProps {
  userGroups: UserGroupsList;
  isLoadingUserGroups: boolean;
}

export const ClientUserGroups = ({
  userGroups,
  isLoadingUserGroups,
}: ClientUserGroupsProps) => {
  if (isLoadingUserGroups) {
    return (
      <>
        <br />
        <br />
        <Spinner size={40} centered={false} />
      </>
    );
  }

  if (!userGroups || userGroups?.length <= 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="subtitle2">User Groups:</Typography>
      <br />
      {userGroups.map(group => {
        return (
          <Typography display="block" variant="body2" key={group.groupName}>
            {group.groupName} ({group.groupAddress})
          </Typography>
        );
      })}
    </Paper>
  );
};
