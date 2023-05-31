import { INodeDetailEntity } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { Location } from '../types';

export const getLocations = (details: INodeDetailEntity[] = []) => {
  const continents = details.reduce((result, { location: { continent } }) => {
    result.add(continent);

    return result;
  }, new Set());

  return [...continents].map<Location>(continent => ({
    continent: t(`continents.${continent}`),
    hasCheckMarkIcon: true,
  }));
};
