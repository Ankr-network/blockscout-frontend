import { TClientTableHistoryPushState } from 'components/ClientTable';
import { IBalancesEntity } from 'multirpc-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMultiRpcSdk } from 'stores';
import { ClientEntity } from './useClients/types';
import { makeClients } from './useClients/utils';

export type TAddressClient = {
  clientTtl: ClientEntity['ttl'];
  clientType?: ClientEntity['type'];
};

export const useAddressClient = (balance?: IBalancesEntity): TAddressClient => {
  const [clientTtl, setClientTtl] = useState(-1);
  const [clientType, setClientType] = useState<ClientEntity['type']>();
  const workerApi = useMultiRpcSdk().getBackofficeGateway();

  const { state } = useLocation<TClientTableHistoryPushState>();

  useEffect(() => {
    if (state) {
      setClientTtl(state.clientTtl ?? -1);
      setClientType(state.clientType);
    } else if (balance) {
      workerApi.getCounters().then(counters => {
        const client: ClientEntity = makeClients([balance], counters)[0];
        setClientTtl(client.ttl ?? -1);
        setClientType(client.type);
      });
    }
  }, [workerApi, state, balance]);

  return { clientTtl, clientType };
};
