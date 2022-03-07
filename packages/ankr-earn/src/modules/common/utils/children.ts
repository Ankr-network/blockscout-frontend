import { ReactNode } from 'react';

export type TNodeWithType = ReactNode & {
  type: () => string | null;
};

// not used function
export const isChildNull = (children?: TNodeWithType): boolean => {
  if (!children) return true;

  return children.type() === null;
};
