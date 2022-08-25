import { ICountersEntityMapped } from 'multirpc-sdk';
import { PremiumPlanClientEntity } from 'types';
import { useMultiRpcSdk } from '../index';
import { LocalGridStore, useLocalGridStore } from '../LocalGridStore';
import { makeClients } from './utils';
import { mapCounters } from 'utils/mapCounters';

let counters: ICountersEntityMapped[] | null = null;

export const usePremiumPlanClients =
  (): LocalGridStore<PremiumPlanClientEntity> => {
    const workerApi = useMultiRpcSdk().getBackofficeGateway();

    const gridStore = useLocalGridStore<PremiumPlanClientEntity>(async () => {
      if (!counters) {
        const countersResponse = await workerApi.getCounters();
        counters = mapCounters(countersResponse);
      }

      const clients: PremiumPlanClientEntity[] = makeClients(counters);

      return [clients, true];
    }, []);

    return gridStore;
  };
