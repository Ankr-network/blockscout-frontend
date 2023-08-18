import { Grid } from '@mui/material';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { DeleteUserFromGroup } from '../DeleteUserFromGroup';
import { SetUserGroupWrapper } from '../SetUserGroup/SetUserGroupWrapper';
import { CreateUserGroup } from '../CreateUserGroup';
import { GroupsList } from '../GroupsList';
import { DeleteUserGroup } from '../DeleteUserGroup';

export const GroupsPageWrapper = () => {
  useSetBreadcrumbs([]);

  return (
    <>
      <Grid
        container
        spacing={12}
        sx={{
          mt: -4,
          mb: 12,
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <SetUserGroupWrapper />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DeleteUserFromGroup />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CreateUserGroup />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DeleteUserGroup />
        </Grid>
      </Grid>

      <GroupsList />
    </>
  );
};
