import { ArchiveRequests } from './ArchiveRequests';
import { WssStats } from './WssStats';
import { DevDaoUsersList } from './DevDaoUsersList';

export const AdminPageWrapper = () => {
  return (
    <>
      <ArchiveRequests />
      <WssStats />
      <DevDaoUsersList />
    </>
  );
};
