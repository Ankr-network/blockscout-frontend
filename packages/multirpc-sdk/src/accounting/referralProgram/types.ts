import { IApiUserGroupParams } from '../userGroup';

export interface IApplyReferralCodeParams extends IApiUserGroupParams {
  code: string;
}

export interface IApplyReferralCodeResult {
  // If false it means that no bonuses are going to be added to user account.
  // In other words, it means that this referral code has expired.
  custom_bonus: boolean;
  // If presented and not empty it means the referral code is related to
  // B2B referral program - promo.
  name?: string;
  // usually "OK"
  result: string;
}

export interface IGetReferrerParams extends IApiUserGroupParams {}

export interface IReferrer {
  address: string; // masked
  joined_at: number; // timestamp in ms
  referral_code: string;
  referral_code_name?: string; // optional
  user: string; // email, masked
  user_provider: string;
}

export interface IGetReferrerResponse {
  referrer: IReferrer;
}
