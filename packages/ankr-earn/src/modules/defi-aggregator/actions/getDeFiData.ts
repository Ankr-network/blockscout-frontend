import axios from 'axios';

import { configFromEnv } from 'modules/api/config';
import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
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

// todo: STAKAN-2484 use translations
const ACTION_ERROR_TEXT = 'Failed to get DeFi aggregator data';
const ERROR_NO_DATA = 'No data found';

export const { useGetDeFiDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDeFiData: build.query<IDeFiItem[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IDeFiItem[]>(async () => {
        const url = new URL(DEFI_URL, baseURL).toString();

        const { data: rawData } = await axios.get<IDeFiItemResponse[]>(url);

        if (!rawData.length) throw new Error(ERROR_NO_DATA);

        return { data: rawData.map(getMapDeFiItem(baseURL)) };
      }, getOnErrorWithCustomText(ACTION_ERROR_TEXT)),
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
