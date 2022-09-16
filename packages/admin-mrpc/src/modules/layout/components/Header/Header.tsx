import { useAppSelector } from 'store/useAppSelector';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { SearchClientsInput } from 'modules/clients/components/SearchClientsInput';
import { CreateTestPremiumUser } from 'modules/clients/components/CreateTestPremiumUser';

export const Header = () => {
  const address = useAppSelector(store => store.auth.address);

  return (
    <>
      {address && <SearchClientsInput />}
      {address && <CreateTestPremiumUser />}
      <ConnectButton />
    </>
  );
};
