import { IDailyChargingParams } from 'multirpc-sdk';

export const getDailyChargingRequest = (
  timestamp: string,
): IDailyChargingParams => {
  const currentDate = new Date().getDate();
  const timestampDate = new Date(Number(timestamp)).getDate();

  return {
    day_offset: currentDate - timestampDate,
  };
};
