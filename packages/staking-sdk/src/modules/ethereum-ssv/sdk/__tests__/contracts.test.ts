/* eslint-disable @typescript-eslint/dot-notation */
import { Web3KeyReadProvider } from '@ankr.com/provider';
import Contract from 'web3-eth-contract';

import { Env } from '../../../common';
import {
  getASETHCTokenContract,
  getSSVStakingPoolContract,
} from '../contracts';

describe('modules/ethereum-ssv/sdk/contracts', () => {
  const provider = {
    getWeb3: () => ({
      eth: {
        Contract,
      },
    }),
  } as unknown as Web3KeyReadProvider;

  test('should return a contract from "getASETHCTokenContract"', () => {
    const [data1, data2] = [
      getASETHCTokenContract({
        provider,
      }),
      getASETHCTokenContract({
        env: Env.Develop,
        provider,
      }),
    ];

    expect(typeof data1['_address'] === 'string').toBe(true);
    expect(Array.isArray(data1['_jsonInterface'])).toBe(true);

    expect(typeof data2['_address'] === 'string').toBe(true);
    expect(Array.isArray(data2['_jsonInterface'])).toBe(true);
  });

  test('should return a contract from "getSSVStakingPoolContract"', () => {
    const [data1, data2] = [
      getSSVStakingPoolContract({
        provider,
      }),
      getSSVStakingPoolContract({
        env: Env.Develop,
        provider,
      }),
    ];

    expect(typeof data1['_address'] === 'string').toBe(true);
    expect(Array.isArray(data1['_jsonInterface'])).toBe(true);

    expect(typeof data2['_address'] === 'string').toBe(true);
    expect(Array.isArray(data2['_jsonInterface'])).toBe(true);
  });
});
