export enum AuthProviderEnum {
  AUTH_PROVIDER_UNKNOWN = 'AUTH_PROVIDER_UNKNOWN',
  AUTH_PROVIDER_GITHUB = 'AUTH_PROVIDER_GITHUB',
  AUTH_PROVIDER_GOOGLE = 'AUTH_PROVIDER_GOOGLE',
}

export enum LoginTypeEnum {
  LOGIN_TYPE_UNKNOWN = 'LOGIN_TYPE_UNKNOWN',
  LOGIN_TYPE_SINGLE_APP = 'LOGIN_TYPE_SINGLE_APP',
  LOGIN_TYPE_UNIVERSAL = 'LOGIN_TYPE_UNIVERSAL',
}

export interface IGetOauth2ParamsRequest {
  provider: AuthProviderEnum;
  application?: string;
  redirectUrl: string;
  ankrState?: string;
}

export interface IGetOauth2ParamsSuccessResponse {
  result: {
    oauthUrl: string;
    clientId: string;
    scopes: string;
    state: string;
    redirectUrl: string;
    oauthCompleteUrl: string;
  }
}

// TODO: use it for error handling
export interface IGetOauth2ParamsErrorResponse {
  error: {
    code: string;
    message: string;
    params: string;
  }
}

export interface IPostSecretCodeRequest {
  secretCode: string;
  state: string;
  provider: AuthProviderEnum;
  redirectUrl: string;
  application?: string;
  type?: LoginTypeEnum;
}

export interface IPostSecretCodeResult {
  accessToken: string;
  expiresAt: string;
}

export interface IPostSecretCodeResponse {
  result: IPostSecretCodeResult;
}
