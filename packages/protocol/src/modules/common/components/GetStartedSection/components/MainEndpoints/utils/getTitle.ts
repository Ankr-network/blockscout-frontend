import { text } from './text';

export interface TitleParams {
  isMultiChain: boolean;
  isGraphQL: boolean;
  urlsCount: number;
}

export const getTitle = ({
  isGraphQL,
  isMultiChain,
  urlsCount: urls,
}: TitleParams) => {
  if (isGraphQL) {
    return text('title-graphql', { urls });
  }

  return isMultiChain ? text('title-multichain') : text('title', { urls });
};
