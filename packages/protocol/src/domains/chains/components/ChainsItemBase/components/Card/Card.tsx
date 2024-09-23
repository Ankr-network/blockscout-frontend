import { ReactNode } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { useChainItemClickHandler } from 'modules/common/hooks/useChainItemClickHandler';

export interface CardProps {
  chainId: ChainID;
  children: ReactNode;
  className: string;
}

export const Card = ({ chainId, children, className }: CardProps) => {
  const onClick = useChainItemClickHandler(chainId);

  return (
    <a className={className} onClick={onClick} role="button" tabIndex={0}>
      {children}
    </a>
  );
};
