import { Web3Address } from 'multirpc-sdk';
import { useEffect, useState } from 'react';
import { useMultiRpcSdk } from 'stores';

export interface IUseClientInfoParams {
  address: Web3Address;
}

export const useClientInfo = ({ address }: IUseClientInfoParams) => {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const backofficeApi = useMultiRpcSdk().getBackofficeGateway();

  useEffect(() => {
    (async () => {
      setIsEmailLoading(true);

      try {
        const response = await backofficeApi.getEmailBindings({
          filter_type: 'address',
          filter: address,
          limit: 1,
        });

        const clientEmail = response.bindings?.[0]?.email;

        if (clientEmail) {
          setEmail(clientEmail);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setIsEmailLoading(false);
      }
    })();
  }, [address, backofficeApi]);

  return {
    isEmailLoading,
    email,
  };
};
