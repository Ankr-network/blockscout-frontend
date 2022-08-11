import { select, Selection } from 'd3';
import { useRef, useEffect, RefObject } from 'react';

export type TSelectSvg = Selection<SVGSVGElement, unknown, null, undefined>;

export interface IUsePortfolio {
  ref: RefObject<SVGSVGElement>;
}

export const usePortfolioChart = (
  render: (svg: TSelectSvg) => void,
  dependencies: unknown[],
): IUsePortfolio => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    render(select(ref.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies.concat(render, ref));

  return {
    ref,
  };
};
