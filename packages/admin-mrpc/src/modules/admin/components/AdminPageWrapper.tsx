import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { ArchiveRequests } from './ArchiveRequests';
import { WssStats } from './WssStats';
import { DevDaoUsersList } from './DevDaoUsersList';

export const AdminPageWrapper = () => {
  useSetBreadcrumbs([]);

  return (
    <>
      <ArchiveRequests />
      <WssStats />
      <DevDaoUsersList />
    </>
  );
};
