import { EndpointGroup } from 'modules/endpoints/types';

export interface IRequestComposerMainProps {
  chainId?: string;
  className?: string;
  group: EndpointGroup;
  hasBlockNumber?: boolean;
  hasRequestHistory?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

export interface IRequestComposerProps extends IRequestComposerMainProps {
  chainId: string;
}
