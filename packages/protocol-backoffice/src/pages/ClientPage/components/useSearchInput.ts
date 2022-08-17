import { useHistory, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { useClients } from 'stores/useClients';
import { ClientEmailsStore } from 'stores/ClientEmailsStore';

export const useSearchInput = (emailStore: ClientEmailsStore) => {
  const { counters } = useClients();
  const { pathname } = useLocation();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  const clientsWithAddress = counters?.filter(c => Boolean(c.address)) || [];
  const foundClientsWithEmails = emailStore.clientsEmails
    .filter(c => c.email.includes(searchValue))
    .map(c => ({ user: undefined, ...c }));
  const foundClientsWithAddress = clientsWithAddress
    .filter(c => c.address?.includes(searchValue))
    .map(c => ({ email: undefined, ...c }));
  const foundClients = [...foundClientsWithEmails, ...foundClientsWithAddress];

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  const onClientClick = (address: string) => {
    history.push({
      pathname: `${pathname}/${address}`,
    });
  };

  return { foundClients, onChange, searchValue, onClientClick };
};
