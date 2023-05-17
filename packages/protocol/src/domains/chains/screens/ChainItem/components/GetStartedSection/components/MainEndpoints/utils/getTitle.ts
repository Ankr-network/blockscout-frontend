import { text } from './text';

export interface TitleParams {
  isMultiChain: boolean;
  urlsCount: number;
}

export const getTitle = ({ isMultiChain, urlsCount: urls }: TitleParams) =>
  isMultiChain ? text('title-multichain') : text('title', { urls });
