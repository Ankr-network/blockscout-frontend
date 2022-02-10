import { ReactNode } from 'react';

export type TNodeWithType = ReactNode & {
  type: () => string | null;
};

export const isChildNull = (children?: TNodeWithType) => {
  if (!children) return true;

  return children.type() === null;
};
