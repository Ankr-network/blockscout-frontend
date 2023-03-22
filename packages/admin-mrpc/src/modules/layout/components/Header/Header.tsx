import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppSelector } from 'store/useAppSelector';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { CreateTestPremiumUser } from 'modules/clients/components/CreateTestPremiumUser';
import { SearchClientsInput } from 'modules/clients/components/SearchClientsInput';
import { AdminRoutesConfig } from 'modules/admin/AdminRoutesConfig';
import { GroupsRoutesConfig } from 'modules/groups/GroupsRoutesConfig';
import { Logo } from '../Logo';

interface HeaderProps {
  hasSecretRouteAccess?: boolean;
}

export const Header = ({ hasSecretRouteAccess }: HeaderProps) => {
  const address = useAppSelector(store => store.auth.address);

  return (
    <>
      <Logo />
      {address && <CreateTestPremiumUser />}
      {address && <SearchClientsInput />}
      {address && (
        <Button
          sx={{ ml: 4 }}
          component={NavLink}
          to={GroupsRoutesConfig.groups.generatePath()}
        >
          User Groups
        </Button>
      )}

      {hasSecretRouteAccess && (
        <Button
          sx={{ ml: 4 }}
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
