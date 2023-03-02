import { EndpointGroup } from 'modules/endpoints/types';
import { Logger } from '../../Logger';
import { LoggerContext } from '../const';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { SolanaHeader } from './SolanaHeader';
import { SolanaMenu } from './SolanaMenu';
import { useSolanaRequestLogger } from './hooks/useSolanaRequestLogger';

export interface SolanaRequestComposerProps {
  className?: string;
  group: EndpointGroup;
  hasBlockNumber?: boolean;
  hasRequestHistory?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

export const SolanaRequestComposer = ({
  className,
  group,
  hasBlockNumber,
  hasRequestHistory,
  hasTitle,
  publicUrl,
}: SolanaRequestComposerProps) => {
  const { clear, logger, logs } = useSolanaRequestLogger();

  return (
    <LoggerContext.Provider value={logger}>
      <RequestComposerTemplate
        className={className}
        hasRequestHistory={hasRequestHistory}
        header={
          <SolanaHeader
            hasBlockNumber={hasBlockNumber}
            hasTitle={hasTitle}
            publicUrl={publicUrl}
          />
        }
        logger={<Logger clear={clear} logs={logs} />}
        menu={<SolanaMenu group={group} />}
      />
    </LoggerContext.Provider>
  );
};
