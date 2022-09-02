import { ICountersEntity, ICountersEntityMapped } from 'multirpc-sdk';

export const mapCounters = (
  counters: ICountersEntity[],
): ICountersEntityMapped[] => {
  return counters.map(c => ({
    ...c,
    createdAt: new Date(c.timestamp),
  }));
};
