import { CHECK_IS_STAKER_EXISTS_URL } from '../const';

export const getCheckIsStakerExistsUrl = (userAddress: string): string => {
  return `${CHECK_IS_STAKER_EXISTS_URL}?address=${userAddress}`;
};
