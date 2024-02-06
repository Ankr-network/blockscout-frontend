import { CustomErrorCode } from './const';

export interface CustomError<Data> extends Error {
  code: CustomErrorCode;

  data?: Data;
}
