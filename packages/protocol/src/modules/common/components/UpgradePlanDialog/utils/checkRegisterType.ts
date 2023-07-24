import { TypeCheckingParams } from '../types';
import { isRegisterType } from './isRegisterType';

export const checkRegisterType = ({
  isLoggedIn = false,
  type,
}: TypeCheckingParams) => isRegisterType(type) && !isLoggedIn;
