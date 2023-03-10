import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppSelector } from 'store/useAppSelector';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { CreateTestPremiumUser } from 'modules/clients/components/CreateTestPremiumUser';
import { SearchClientsInput } from 'modules/clients/components/SearchClientsInput';
import { AdminRoutesConfig } from 'modules/admin/AdminRoutesConfig';
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

      {hasSecretRouteAccess && (
        <Button
          component={NavLink}
          to={AdminRoutesConfig.admin.generatePath()}
          sx={{ ml: 6 }}
        >
          Admin requests
        </Button>
      )}
      <ConnectButton />
    </>
  );
};
