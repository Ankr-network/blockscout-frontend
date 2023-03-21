import { CountdownContext, LoggerContext } from '../const';
import { EndpointGroup } from 'modules/endpoints/types';
import { Logger } from '../../Logger';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { SolanaHeader } from './SolanaHeader';
import { SolanaMenu } from './SolanaMenu';
import { useRequestCountdown } from 'domains/requestComposer/hooks/useRequestCountdown';
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

  const countdown = useRequestCountdown();

  return (
    <LoggerContext.Provider value={logger}>
      <CountdownContext.Provider value={countdown}>
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
      </CountdownContext.Provider>
    </LoggerContext.Provider>
  );
};
