import { t } from '@ankr.com/common';
import axios from 'axios';

import { configFromEnv } from 'modules/api/config';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import {
  DEFI_URL,
  IDeFiItemResponse,
  TDeFiNetwork,
  TDeFiProtocol,
  TDeFiType,
} from '../api/defi';

const baseURL = configFromEnv().gatewayConfig.strapiUrl;

export interface IDeFiItem {
  assets: string;
  network: TDeFiNetwork;
  protocol: TDeFiProtocol;
  type: TDeFiType;
  baseRewards: string;
  protocolLink: string;
  protocolName: string;
  protocolIcon: string;
  farmingRewards: string;
}

export const { useGetDeFiDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDeFiData: build.query<IDeFiItem[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IDeFiItem[]>(
        async () => {
          const url = new URL(DEFI_URL, baseURL).toString();

          const { data: rawData } = await axios.get<IDeFiItemResponse[]>(url);

          if (!rawData.length) throw new Error(t('defi.errors.no-data'));

          return { data: rawData.map(getMapDeFiItem(baseURL)) };
        },
        error => getExtendedErrorText(error, t('defi.errors.aggregator')),
      ),
    }),
  }),
});

function getMapDeFiItem(baseUrl: string) {
  return (item: IDeFiItemResponse): IDeFiItem => ({
    assets: item.assets,
    network: item.network,
    protocol: item.protocol,
    type: item.type,
    baseRewards: item.baseRewards,
    protocolLink: item.protocolLink,
    protocolName: item.protocolName,
    protocolIcon: new URL(item.protocolIcon.url, baseUrl).toString(),
    farmingRewards: item.farmingRewards ?? '',
  });
}
