import { AvailablePlatforms } from '../types';

export const getExchangeName = (exchange: string) => {
  switch (exchange) {
    case AvailablePlatforms.OpenOceanV2:
      return 'OpenOcean';
    default:
      return exchange;
  }
};
