import { FieldName } from '../types';

export const getFieldName = (rootName: string, field: FieldName) =>
  `${rootName}_${field}`;
