// @ts-nocheck
import BigNumber from 'bignumber.js';
import { IWorkerGlobalStatus } from 'multirpc-sdk';

export const calculateTotalRequests = (
  rpcTotalRequest: number,
  standaloneTotalRequest: number,
) => {
  return new BigNumber(standaloneTotalRequest).plus(rpcTotalRequest).toNumber();
};

const calculateTotalValues = (
  rpcStats: IWorkerGlobalStatus,
  standaloneStats: IWorkerGlobalStatus,
): IWorkerGlobalStatus => {
  const totalRequests = calculateTotalRequests(
    rpcStats.totalRequests,
    standaloneStats?.totalRequests || 0,
  );

  const totalCached = new BigNumber(standaloneStats.totalCached || 0)
    .plus(rpcStats.totalCached)
    .toNumber();

  return {
    ...rpcStats,
    totalRequests: Math.ceil(totalRequests),
    totalCached: Math.ceil(totalCached),
  };
};

const calculateRequests = (
  totalStats: IWorkerGlobalStatus,
  standaloneStats: IWorkerGlobalStatus,
) => {
  const standaloneRequestsHistory = standaloneStats.totalRequestsHistory || {};

  Object.keys(totalStats.totalRequestsHistory).forEach((timestamp: string) => {
    const standaloneRequestsHistoryTimestamp =
      standaloneRequestsHistory[timestamp];

    if (standaloneRequestsHistoryTimestamp) {
      const totalStatsKeyValue = new BigNumber(
        totalStats.totalRequestsHistory[timestamp],
      );

      totalStats.totalRequestsHistory[timestamp] = totalStatsKeyValue
        .plus(standaloneRequestsHistoryTimestamp || 0)
        .toNumber();
    }
  });

  return totalStats;
};

const calculateCountriesStats = (
  totalStats: IWorkerGlobalStatus,
  standaloneStats: IWorkerGlobalStatus,
) => {
  const standaloneCountries = standaloneStats.countries || {};

  Object.keys(totalStats.countries).forEach((countryId: string) => {
    const standaloneCountry = standaloneCountries[countryId];

    if (standaloneCountry) {
      const countryRequestsValue = new BigNumber(
        totalStats.countries[countryId]?.requests,
      );

      totalStats.countries[countryId].requests = countryRequestsValue
        .plus(standaloneCountry?.requests || 0)
        .toNumber();
    }
  });

  Object.keys(standaloneCountries).forEach((countryId: string) => {
    const standaloneCountry = standaloneCountries[countryId] || {};

    if (!totalStats.countries[countryId]) {
      const requests = new BigNumber(standaloneCountry.requests).toNumber();
      const bytes = new BigNumber(standaloneCountry.bytes).toNumber();

      totalStats.countries[countryId] = {
        country: countryId,
        requests,
        bytes,
      };
    }
  });

  return totalStats;
};

export const calculateRPCAndStandaloneStats = (
  rpcStats: IWorkerGlobalStatus,
  standaloneStats: IWorkerGlobalStatus,
) => {
  const calculatedTotalStats = calculateTotalValues(rpcStats, standaloneStats);

  const calculatedCountriesStats = calculateCountriesStats(
    calculatedTotalStats,
    standaloneStats,
  );

  return calculateRequests(calculatedCountriesStats, standaloneStats);
};
