import { Paper, Typography } from '@mui/material';
import { OverlaySpinner as Spinner } from '@ankr.com/ui';
import { Link } from 'react-router-dom';

import { UserGroupsList } from 'modules/groups/actions/getUserGroups';
import { t } from 'modules/i18n/utils/intl';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';

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
          <Spinner size={40} />
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
          <Link
            to={ClientsRoutesConfig.clientInfo.generatePath(group.groupAddress)}
            key={group.groupName}
          >
            <Typography display="block" variant="body2">
              {group.groupName} ({group.groupAddress})
            </Typography>
          </Link>
        ))}
    </Paper>
  );
};
