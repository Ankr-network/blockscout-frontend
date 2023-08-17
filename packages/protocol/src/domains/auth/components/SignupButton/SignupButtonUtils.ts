import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { shrinkEmail } from 'modules/common/utils/shrinkEmail';

export const shrinkUserData = (
  address?: string,
  email?: string,
  loginName?: string,
) => {
  return {
    address: shrinkAddress(address),
    email: shrinkEmail(email),
    loginName: shrinkAddress(loginName),
  };
};
