import { IApiChainURL } from 'domains/chains/api/queryChains';

export interface RpcItemProps {
  logoSrc: string;
  name: string;
  description?: string;
  period: string;
  links: IApiChainURL[];
  className?: string;
  extraDescription?: string;
  extraLabel?: string;
  hasOnClick?: boolean;
  id: string;
}
