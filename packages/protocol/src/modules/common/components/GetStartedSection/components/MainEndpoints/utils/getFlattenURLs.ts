import { ChainURL } from '@ankr.com/chains-list';

export interface FlattenURLsParams {
  urlKey: keyof ChainURL;
  urls: ChainURL[];
}

export const getFlattenURLs = ({ urlKey, urls }: FlattenURLsParams) => {
  const flattenURLs = urls.flatMap(url => (url[urlKey] ? [url[urlKey]!] : []));

  return [flattenURLs, flattenURLs.length] as const;
};
