import { useCallback, useState } from 'react';

import { ContentType } from '../constants';

export const useContentType = () => {
  const [contentType, setContentType] = useState(ContentType.Whitelist);

  const setAddDomainContent = useCallback(
    () => setContentType(ContentType.AddDomain),
    [],
  );
  const setAddIPContent = useCallback(
    () => setContentType(ContentType.AddIP),
    [],
  );
  const setAddSmartContractContent = useCallback(
    () => setContentType(ContentType.AddSmartContract),
    [],
  );
  const setEditDomainContent = useCallback(
    () => setContentType(ContentType.EditDomain),
    [],
  );
  const setEditIPContent = useCallback(
    () => setContentType(ContentType.EditIP),
    [],
  );
  const setEditSmartContractContent = useCallback(
    () => setContentType(ContentType.EditSmartContract),
    [],
  );
  const setWhitelistContent = useCallback(
    () => setContentType(ContentType.Whitelist),
    [],
  );

  return {
    contentType,
    setAddDomainContent,
    setAddIPContent,
    setAddSmartContractContent,
    setEditDomainContent,
    setEditIPContent,
    setEditSmartContractContent,
    setWhitelistContent,
  };
};
