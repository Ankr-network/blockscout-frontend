/* eslint-disable @typescript-eslint/dot-notation */
import Contract from 'web3-eth-contract';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { Env } from '../../../common';
import {
  getXDCStakingPoolContract,
  getAnkrXDCTokenContract,
} from '../contracts';

describe('modules/xdc/sdk/contracts', () => {
  const provider = {
    getWeb3: () => ({
      eth: {
        Contract,
      },
    }),
  } as unknown as Web3KeyReadProvider;

  test('should return a contract from "getAnkrXDCTokenContract"', () => {
    const [data1, data2] = [
      getAnkrXDCTokenContract({
        provider,
      }),
      getAnkrXDCTokenContract({
        env: Env.Develop,
        provider,
      }),
    ];

    expect(typeof data1['_address'] === 'string').toBe(true);
    expect(Array.isArray(data1['_jsonInterface'])).toBe(true);

    expect(typeof data2['_address'] === 'string').toBe(true);
    expect(Array.isArray(data2['_jsonInterface'])).toBe(true);
  });

  test('should return a contract from "getXDCStakingPoolContract"', () => {
    const [data1, data2] = [
      getXDCStakingPoolContract({
        provider,
      }),
      getXDCStakingPoolContract({
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
