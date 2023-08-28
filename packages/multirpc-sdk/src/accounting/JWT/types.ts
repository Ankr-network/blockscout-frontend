import { IApiUserGroupParams } from '../userGroup';

export interface IJwtTokenLimitResponse {
  jwtLimit: number;
}

export interface IJwtTokenResponse {
  index: number;
  jwt_data: string;
  is_encrypted: boolean;
  name: string;
  description: string;
}

export interface IJwtTokenRequestParams extends IApiUserGroupParams {
  index: number;
  totp?: string;
}

export interface IJwtTokenCreateParams extends IApiUserGroupParams {
  index: number;
}

export interface IUpdateJwtTokenFreezeStatusParams extends IApiUserGroupParams {
  token: string;
}

export interface IUpdateJwtTokenFreezeStatusRequestParams {
  freeze: boolean;
}

export interface IJwtTokenStatusParams {
  token: string;
}

export interface IJwtTokenStatusResponse {
  suspended: boolean;
  freemium: boolean;
  frozen: boolean;
}

export interface IJwtTokenRequestBody {
  name?: string;
  description?: string;
}