import { IApiUserGroupParams } from '../userGroup';

export interface IApplyReferralCodeParams extends IApiUserGroupParams {
  code: string;
}
