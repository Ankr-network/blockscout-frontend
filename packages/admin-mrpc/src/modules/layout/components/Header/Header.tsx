import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { SearchClientsInput } from 'modules/clients/components/SearchClientsInput';
import { useAppSelector } from 'store/useAppSelector';

export const Header = () => {
  const address = useAppSelector(store => store.auth.address);
  return (
    <>
      {address && <SearchClientsInput />}
      <ConnectButton />
    </>
  );
};
