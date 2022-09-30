import { useAppSelector } from 'store/useAppSelector';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { CreateTestPremiumUser } from 'modules/clients/components/CreateTestPremiumUser';
import { SearchClientsInput } from 'modules/clients/components/SearchClientsInput';
import { Logo } from '../Logo';

export const Header = () => {
  const address = useAppSelector(store => store.auth.address);

  return (
    <>
      <Logo />
      {address && <CreateTestPremiumUser />}
      {address && <SearchClientsInput />}
      <ConnectButton />
    </>
  );
};
