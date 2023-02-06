import { EndpointGroup } from 'modules/endpoints/types';

export interface IRequestComposerMainProps {
  group: EndpointGroup;
  publicUrl?: string;
  className?: string;
  chainId?: string;
}

export interface IRequestComposerProps extends IRequestComposerMainProps {
  chainId: string;
}
