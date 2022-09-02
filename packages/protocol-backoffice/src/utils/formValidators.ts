import { Rule } from 'antd/lib/form';
import {
  PREFIXED_WEB3_ADDRESS_LENGTH,
  URL_ORGANIZATION_POSITION,
} from 'components/const';

export const web3AddressValidator: Rule = {
  validator: async (_, value: string) => {
    if (
      value.length !== PREFIXED_WEB3_ADDRESS_LENGTH ||
      !value.startsWith('0x')
    ) {
      throw new Error('Invalid Web3 Address');
    }
  },
};

export const emailValidator: Rule = {
  validator: async (_, value: string) => {
    if (value && !value.match(/\S+@\S+\.\S+/)) {
      throw new Error('Invalid Email Address');
    }
  },
};

export const getOrganizationFromURL = (
  requestUrl: string,
): string | undefined => {
  const url = new URL(requestUrl);
  const split = url.hostname.split('.');

  if (split.length < 3) return undefined;

  const organization = split.slice(URL_ORGANIZATION_POSITION).join('.');

  return organization;
};
