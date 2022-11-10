import axios from 'axios';

import { configFromEnv } from 'modules/api/config';
import { web3Api } from 'modules/api/web3Api';

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
  farmingRewards: string;
}

export const { useGetDeFiDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getDeFiData: build.query<IDeFiItem[], void>({
      queryFn: async () => {
        const url = new URL(DEFI_URL, baseURL).toString();

        const { data: rawData } = await axios.get(url);

        return {
          data: (rawData as IDeFiItemResponse[]).map<IDeFiItem>(item => ({
            assets: item.assets,
            network: item.network,
            protocol: item.protocol,
            type: item.type,
            baseRewards: item.baseRewards,
            protocolLink: item.protocolLink,
            farmingRewards: item.farmingRewards ?? '',
          })),
        };
      },
    }),
  }),
});
