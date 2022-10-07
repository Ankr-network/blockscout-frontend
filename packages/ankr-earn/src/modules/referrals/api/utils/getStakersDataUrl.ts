import { GET_STAKERS_DATA_URL } from '../const';

export const getStakersDataUrl = (code: string): string => {
  return `${GET_STAKERS_DATA_URL}?referral_code=${code}`;
};
