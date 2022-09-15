import { IWorkerGlobalStatus } from './types';

export const convertStatsToNumber = (
  obj: IWorkerGlobalStatus<string>,
): IWorkerGlobalStatus<number> => {
  const res: any = {};

  Object.keys(obj).forEach((key: string) => {
    res[key] = {};

    const value: any = obj[key as keyof IWorkerGlobalStatus];

    if (typeof value === 'object') {
      res[key] = convertStatsToNumber(value);
    } else if (typeof value === 'string') {
      try {
        const parsed = parseInt(value, 10);
        res[key] = Number.isNaN(parsed) ? value : parsed;
      } catch (error) {
        res[key] = value;
      }
    } else {
      res[key] = value;
    }
  });

  return res;
};
