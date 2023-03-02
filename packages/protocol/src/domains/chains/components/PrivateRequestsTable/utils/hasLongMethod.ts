import { JOINER } from '../const';
import { TableVariant } from '../types';

const MAX_METHOD_LENGTH = 20;

export interface HasLongMethodParams {
  payload: string;
  variant: TableVariant;
}

export const hasLongMethod = ({ payload, variant }: HasLongMethodParams) =>
  variant === TableVariant.Integrated
    ? payload.split(JOINER).some(el => el.length > MAX_METHOD_LENGTH)
    : false;
