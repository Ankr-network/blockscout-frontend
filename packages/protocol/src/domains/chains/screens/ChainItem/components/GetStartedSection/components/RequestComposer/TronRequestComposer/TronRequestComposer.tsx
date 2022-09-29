import { EndpointGroup } from 'modules/endpoints/types';
import { TronHeader } from './TronHeader';
import { Logger } from '../components/Logger';
import { RequestComposerTemplate } from '../components/RequestComposerTemplate';
import { useTronChainRequestLogger } from './hooks/useTronChainRequestLogger';
import { TronChainMenu } from './TronChainMenu/TronChainMenu';

export interface IRequestComposerProps {
  group: EndpointGroup;
  publicUrl: string;
  className?: string;
}

export const TronRequestComposer = ({
  group,
  publicUrl,
  className,
}: IRequestComposerProps) => {
  const { clear, logs } = useTronChainRequestLogger();

  return (
    <RequestComposerTemplate
      header={<TronHeader publicUrl={publicUrl} />}
      menu={<TronChainMenu group={group} />}
      logger={<Logger clear={clear} logs={logs} />}
      className={className}
    />
  );
};
