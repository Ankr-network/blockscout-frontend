/**
 * TODO: Remove this after https://github.com/Ankr-network/ankr-javascript-sdk/pull/73
 */

declare module '@ankr.com/multirpc' {
  export * from '@ankr.com/multirpc/dist/types';
  export { MultiRpcSdk as default } from '@ankr.com/multirpc/dist/types';

  import { IWorkerNodesWeight as IWorkerNodesWeightBase } from '@ankr.com/multirpc/dist/types';

  export type IWorkerNodesWeight = (IWorkerNodesWeightBase[0] & {
    score: number;
  })[];
}
