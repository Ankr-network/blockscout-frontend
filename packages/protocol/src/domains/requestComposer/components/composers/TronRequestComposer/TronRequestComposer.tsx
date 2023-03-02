import { EndpointGroup } from 'modules/endpoints/types';
import { Logger } from '../../Logger';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { TronChainMenu } from './TronChainMenu/TronChainMenu';
import { TronHeader } from './TronHeader';
import { useTronChainRequestLogger } from './hooks/useTronChainRequestLogger';

export interface IRequestComposerProps {
  className?: string;
  group: EndpointGroup;
  hasBlockNumber?: boolean;
  hasRequestHistory?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

export const TronRequestComposer = ({
  className,
  group,
  hasBlockNumber,
  hasRequestHistory,
  hasTitle,
  publicUrl,
}: IRequestComposerProps) => {
  const { clear, logs } = useTronChainRequestLogger();

  return (
    <RequestComposerTemplate
      className={className}
      hasRequestHistory={hasRequestHistory}
      header={
        <TronHeader
          hasBlockNumber={hasBlockNumber}
          hasTitle={hasTitle}
          publicUrl={publicUrl}
        />
      }
      logger={<Logger clear={clear} logs={logs} />}
      menu={<TronChainMenu group={group} />}
    />
  );
};
