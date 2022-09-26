import { useHistory, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { ClientEmailsStore } from 'stores/ClientEmailsStore';
import { LocalGridStore } from 'stores/LocalGridStore';
import { PremiumPlanClientEntity } from 'types';

export const useSearchInput = (
  emailStore: ClientEmailsStore,
  gridStore: LocalGridStore<PremiumPlanClientEntity>,
) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  const clientsWithAddress =
    gridStore.items?.filter(c => Boolean(c.address)) || [];
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
    setSearchValue(e.target.value.toLowerCase());
  };

  const onClientClick = (address: string) => {
    history.push({
      pathname: `${pathname}/${address}`,
    });
  };

  return { foundClients, onChange, searchValue, onClientClick };
};
