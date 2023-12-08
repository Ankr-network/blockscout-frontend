import {
  IGetOauth2ParamsRequest,
  IGetOauth2ParamsSuccessResponse,
  IPostSecretCodeRequest,
  IPostSecretCodeResponse,
} from './types';

export interface IUAuthGateway {
  getAuthLink(params: IGetOauth2ParamsRequest): Promise<IGetOauth2ParamsSuccessResponse>;

  updateCredentials(params: IPostSecretCodeRequest): Promise<IPostSecretCodeResponse>;
}
