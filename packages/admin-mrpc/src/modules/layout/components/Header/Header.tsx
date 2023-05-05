import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { CreateTestPremiumUser } from 'modules/clients/components/CreateTestPremiumUser';
import { AdminRoutesConfig } from 'modules/admin/AdminRoutesConfig';
import { GroupsRoutesConfig } from 'modules/groups/GroupsRoutesConfig';
import { Logo } from '../Logo';

interface HeaderProps {
  address?: string;
  hasSecretRouteAccess?: boolean;
  hasTestDriveTokenCreationAccess?: boolean;
}

export const Header = ({
  address,
  hasSecretRouteAccess,
  hasTestDriveTokenCreationAccess,
}: HeaderProps) => {
  return (
    <>
      <Logo />
      {address && hasTestDriveTokenCreationAccess && <CreateTestPremiumUser />}
      {address && (
        <Button
          sx={{ mr: 4 }}
          component={NavLink}
          to={GroupsRoutesConfig.groups.generatePath()}
        >
          User Groups
        </Button>
      )}

      {hasSecretRouteAccess && (
        <Button
          sx={{ mr: 4 }}
          component={NavLink}
          to={AdminRoutesConfig.admin.generatePath()}
        >
          Admin requests
        </Button>
      )}
      <ConnectButton />
    </>
  );
};
