import BigNumber from 'bignumber.js';

import { Env } from '../types/types';

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

export const isMainnet = currentEnv === Env.Production;

export const ZERO = new BigNumber(0);
