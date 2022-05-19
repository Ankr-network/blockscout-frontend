import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { isMainnet } from 'modules/common/const';

export interface IFetchUSDResponseData {
  services: {
    serviceName: string;
    totalStaked: string;
    stakers: string;
    apy: string;
    totalStakedUsd: string;
  }[];
}

// for dev env. CORS error
const EMPTY_USD_OBJ: IFetchUSDResponseData = {
  services: [
    {
      serviceName: 'ksm',
      totalStaked: '57.685872545945',
      stakers: '10',
      apy: '9.6140644',
      totalStakedUsd: '9073.987751',
    },
    {
      serviceName: 'ftm',
      totalStaked: '173941.69893040406',
      stakers: '295',
      apy: '7.104171096',
      totalStakedUsd: '170445.4708',
    },
    {
      serviceName: 'eth',
      totalStaked: '54880.3',
      stakers: '4364',
      apy: '4.97',
      totalStakedUsd: '158115632.3',
    },
    {
      serviceName: 'polygon',
      totalStaked: '908806.7792375382',
      stakers: '308',
      apy: '8.929394573',
      totalStakedUsd: '1135099.667',
    },
    {
      serviceName: 'avax',
      totalStaked: '11221.23788202',
      stakers: '933',
      apy: '8.188040014052419',
      totalStakedUsd: '777070.7233',
    },
    {
      serviceName: 'bnb',
      totalStaked: '29940.822331413074',
      stakers: '644',
      apy: '6.067432952118484',
      totalStakedUsd: '11649973.97',
    },
    {
      serviceName: 'dot',
      totalStaked: '3173.9581242859',
      stakers: '66',
      apy: '10.5800886',
      totalStakedUsd: '53512.93398',
    },
  ],
};

const mapData = (data: IFetchUSDResponseData): IFetchUSDResponseData => {
  // Need for one case, due to in extenral service `serviceName` for Polygon
  // not equals with our `matic`, but other good.
  data.services = data.services.map(item => {
    if (item.serviceName === 'polygon') {
      item.serviceName = 'matic';
    }
    return item;
  });

  return data;
};

export const getUSDequiwalent = createSmartAction<
  RequestAction<IFetchUSDResponseData, IFetchUSDResponseData>
>(
  'stake/getUSDequiwalent',
  (): RequestAction => ({
    request: isMainnet
      ? { url: 'v1alpha/metrics' }
      : {
          promise: (async () => EMPTY_USD_OBJ)(),
        },
    meta: {
      driver: isMainnet ? 'axios' : undefined,
      getData: mapData,
    },
  }),
);
