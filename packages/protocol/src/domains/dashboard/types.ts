import { FetchPrivateStatsParams } from 'domains/chains/actions/private/fetchPrivateStats';

export type ProjectsStatsParams = Pick<
  FetchPrivateStatsParams,
  'group' | 'interval'
>;
