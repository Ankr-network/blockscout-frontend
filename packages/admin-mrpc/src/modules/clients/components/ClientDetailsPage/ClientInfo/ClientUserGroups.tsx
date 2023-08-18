import { Spinner } from 'ui';
import { Paper, Typography } from '@mui/material';

import { UserGroupsList } from 'modules/groups/actions/getUserGroups';
import { t } from 'modules/i18n/utils/intl';

interface ClientUserGroupsProps {
  userGroups: UserGroupsList;
  isLoadingUserGroups: boolean;
}

export const ClientUserGroups = ({
  userGroups,
  isLoadingUserGroups,
}: ClientUserGroupsProps) => {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="subtitle2">
        {t('client-details.groups.title')}
      </Typography>
      <br />
      {isLoadingUserGroups && (
        <>
          <br />
          <Spinner size={40} centered={false} />
        </>
      )}
      {!isLoadingUserGroups && userGroups?.length <= 0 && (
        <Typography variant="body2">
          {t('client-details.groups.no-groups')}
        </Typography>
      )}
      {!isLoadingUserGroups &&
        userGroups?.length > 0 &&
        userGroups.map(group => (
          <Typography display="block" variant="body2" key={group.groupName}>
            {group.groupName} ({group.groupAddress})
          </Typography>
        ))}
    </Paper>
  );
};
