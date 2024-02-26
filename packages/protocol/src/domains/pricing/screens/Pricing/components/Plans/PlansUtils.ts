import { INTL_ROOT } from '../../const';

export const INTL_PLANS_ROOT = `${INTL_ROOT}.plans`;

export enum EPlanList {
  Free = 'free',
  Premium = 'premium',
  Enterprise = 'enterprise',
}

export const TIP_LIST = [EPlanList.Premium, EPlanList.Enterprise];

export const FREE_INFO_COUNT = 4;
export const INFO_COUNT = 5;
