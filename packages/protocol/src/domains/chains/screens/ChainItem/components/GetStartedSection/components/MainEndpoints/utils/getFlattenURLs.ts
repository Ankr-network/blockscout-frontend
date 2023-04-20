import { IApiChainURL } from 'domains/chains/api/queryChains';

export interface FlattenURLsParams {
  urlKey: keyof IApiChainURL;
  urls: IApiChainURL[];
}

export const getFlattenURLs = ({ urlKey, urls }: FlattenURLsParams) => {
  const flattenURLs = urls.flatMap(url => (url[urlKey] ? [url[urlKey]!] : []));

  return [flattenURLs, flattenURLs.length] as const;
};
