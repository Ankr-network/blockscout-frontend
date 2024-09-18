import {
  IBuildPublicUrlsProps,
  buildPublicUrls as buildPublicUrlsUtil,
} from '@ankr.com/chains-list';

export const buildPublicUrls = (props: IBuildPublicUrlsProps) => {
  return buildPublicUrlsUtil(props);
};
