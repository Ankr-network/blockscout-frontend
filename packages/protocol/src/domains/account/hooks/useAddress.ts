import { useEffect, useState } from 'react';

import { MultiService } from 'modules/api/MultiService';

export const useAddress = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getAddress = async () => {
      const service = await MultiService.getInstance();

      const provider = service.getKeyProvider();
      const { currentAccount } = provider;

      setAddress(currentAccount);
    };

    getAddress();

    return () => setAddress('');
  }, []);

  return address;
};
