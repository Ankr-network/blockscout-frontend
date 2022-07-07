import _intersectionBy from 'lodash/intersectionBy';

interface GenericOption {
  value: unknown;
}

export const getIntersecion = <T extends GenericOption>(
  opts: T[],
  values: string[],
): T[] => {
  return _intersectionBy<T, string>(opts, values, v => (v as T)?.value ?? v);
};
