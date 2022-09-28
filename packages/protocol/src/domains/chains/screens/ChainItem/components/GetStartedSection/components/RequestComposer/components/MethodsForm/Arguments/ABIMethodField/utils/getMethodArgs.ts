import { ABI } from 'domains/requestComposer/types';

export interface MethodParams {
  abi?: ABI;
  methodName: string;
}

export const getMethodArgs = ({ abi = [], methodName }: MethodParams) =>
  abi.find(({ name }) => name === methodName)?.inputs ?? [];
