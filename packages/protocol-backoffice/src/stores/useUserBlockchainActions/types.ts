import { IUsageDetailEntity, IUsageEntity } from 'multirpc-sdk';

export type TUserBlockchainAction = IUsageDetailEntity & {
  blockchain: IUsageEntity['blockchain'];
};
