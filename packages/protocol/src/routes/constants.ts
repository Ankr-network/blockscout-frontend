export const INDEX_PATH = '/';
export const CONTENT_QUERY_PARAM = 'content';

export enum IndexContent {
  Endpoints = 'endpoints',
}

export const INDEX_ENDPOINTS_PATH = `${INDEX_PATH}?${CONTENT_QUERY_PARAM}=${IndexContent.Endpoints}`;
