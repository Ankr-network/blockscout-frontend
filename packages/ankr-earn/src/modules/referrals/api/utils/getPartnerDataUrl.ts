import { GET_PARTNER_DATA_URL } from '../const';

export const getPartnerDataUrl = (code: string): string => {
  return `${GET_PARTNER_DATA_URL}?referral_code=${code}`;
};
