import { ReactNode } from 'react';

import { ChainID } from 'domains/chains/types';
import { useClickHandler } from './hooks/useClickHandler';

export interface CardProps {
  chainId: ChainID;
  children: ReactNode;
  className: string;
}

export const Card = ({ chainId, children, className }: CardProps) => {
  const onClick = useClickHandler(chainId);

  return (
    <a className={className} onClick={onClick} role="button" tabIndex={0}>
      {children}
    </a>
  );
};
