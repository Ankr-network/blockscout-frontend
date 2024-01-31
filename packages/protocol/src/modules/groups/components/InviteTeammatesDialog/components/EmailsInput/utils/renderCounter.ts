export interface RenderCounterParams {
  count: number;
  limit: number;
}

export const renderCounter = ({ count, limit }: RenderCounterParams) =>
  `${count}/${limit}`;
