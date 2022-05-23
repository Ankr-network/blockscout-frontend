import { MethodRequest } from 'domains/chains/types';

export interface PreparedRequest extends MethodRequest {
  percent: number;
}
