import { useRequestCountdown } from 'domains/requestComposer/hooks/useRequestCountdown';

import { CountdownContext, LoggerContext } from '../const';
import { IRequestComposerMainProps } from '../RequestComposerTypes';
import { Logger } from '../../Logger';
import { NearHeader } from './NearHeader/NearHeader';
import { NearMenu } from './NearMenu/NearMenu';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { useNearRequestLogger } from './hooks/useNearRequestLogger';

export const NearRequestComposer = ({
  className,
  group,
  hasBlockNumber,
  hasRequestHistory,
  hasTitle,
  publicUrl,
}: IRequestComposerMainProps) => {
  const { clear, logger, logs } = useNearRequestLogger();

  const countdown = useRequestCountdown();

  return (
    <LoggerContext.Provider value={logger}>
      <CountdownContext.Provider value={countdown}>
        <RequestComposerTemplate
          className={className}
          hasRequestHistory={hasRequestHistory}
          header={
            <NearHeader
              hasBlockNumber={hasBlockNumber}
              hasTitle={hasTitle}
              publicUrl={publicUrl}
            />
          }
          logger={<Logger clear={clear} logs={logs} />}
          menu={<NearMenu group={group} />}
        />
      </CountdownContext.Provider>
    </LoggerContext.Provider>
  );
};
