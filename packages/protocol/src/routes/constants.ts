export const INDEX_PATH = '/';

export const CONTENT_QUERY_PARAM_NAME = 'content';

export const REFERRAL_CODE_QUERY_PARAM_NAME = 'utm_referral';

export enum EIndexContent {
  Endpoints = 'endpoints',
}

export const INDEX_ENDPOINTS_PATH = `${INDEX_PATH}?${CONTENT_QUERY_PARAM_NAME}=${EIndexContent.Endpoints}`;
