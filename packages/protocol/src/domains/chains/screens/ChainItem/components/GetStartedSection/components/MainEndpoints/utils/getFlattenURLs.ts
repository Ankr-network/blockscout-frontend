import { ChainURL } from 'domains/chains/types';

export interface FlattenURLsParams {
  urlKey: keyof ChainURL;
  urls: ChainURL[];
}

export const getFlattenURLs = ({ urlKey, urls }: FlattenURLsParams) => {
  const flattenURLs = urls.flatMap(url => (url[urlKey] ? [url[urlKey]!] : []));

  return [flattenURLs, flattenURLs.length] as const;
};
