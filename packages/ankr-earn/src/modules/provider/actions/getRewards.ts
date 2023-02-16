import axios, { AxiosResponse } from 'axios';
import BigNumber from 'bignumber.js';

import { ankrApi } from 'modules/api/ankrApi';
import { configFromEnv } from 'modules/api/config';

const { gatewayConfig } = configFromEnv();

// The test team does not have wallets with rewards.
// Therefore, in order to be able to check the workability
// of this functionality, we need to create such an opportunity.
const testReward = new BigNumber(77.7);
const testAddresses = [
  '0x402fDb1a672166Ac3E40Ce6B491869E8Fe408E34',
  '0x66a93c113f0232fe418bbb7E9afA5cf12e11c400',
].map(addr => addr.toLowerCase());

const REWARD_PROVIDER_URL = 'v1alpha/reward/provider';

interface IProviderRewardsResponse {
  rewards: string;
}

export const { useGetProviderRewardsQuery } = ankrApi.injectEndpoints({
  endpoints: build => ({
    getProviderRewards: build.query<BigNumber, string>({
      queryFn: async userAddress => {
        const { data: rawData }: AxiosResponse<IProviderRewardsResponse> =
          await axios({
            method: 'get',
            url: `${REWARD_PROVIDER_URL}/${userAddress}`,
            baseURL: gatewayConfig.baseUrl,
          });

        if (testAddresses.includes(userAddress)) {
          return { data: testReward };
        }

        const data = new BigNumber(rawData.rewards);

        return { data };
      },
    }),
  }),
});
