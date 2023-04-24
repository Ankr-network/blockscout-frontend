import { text } from './text';

export interface TitleParams {
  chainName: string;
  isMultiChain: boolean;
  urlsCount: number;
}

export const getTitle = ({
  chainName,
  isMultiChain,
  urlsCount: urls,
}: TitleParams) =>
  isMultiChain ? text('title-multichain') : text('title', { chainName, urls });
