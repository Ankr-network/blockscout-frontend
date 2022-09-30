import { BlockNumberConstant as Constant } from 'domains/requestComposer/constants';

const { EARLIEST, LATEST, PENDING } = Constant;
const constants = [EARLIEST, LATEST, PENDING];

export const isBlockNumberConstant = (value: string): value is Constant =>
  constants.includes(value as Constant);
