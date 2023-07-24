import { useRequestCountdown } from 'domains/requestComposer/hooks/useRequestCountdown';

import { EVMHeader } from './EVMHeader/EVMHeader';
import { EVMMenu } from './EVMMenu/EVMMenu';
import { IRequestComposerMainProps } from '../RequestComposerTypes';
import { Logger } from '../../Logger';
import { CountdownContext, LoggerContext } from '../const';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { useEVMRequestLogger } from './hooks/useEVMRequestLogger';

export const EVMRequestComposer = ({
  chainId,
  className,
  group,
  hasBlockNumber,
  hasRequestHistory,
  hasTitle,
  publicUrl,
}: IRequestComposerMainProps) => {
  const { clear, logger, logs } = useEVMRequestLogger();

  const countdown = useRequestCountdown();

  return (
    <LoggerContext.Provider value={logger}>
      <CountdownContext.Provider value={countdown}>
        <RequestComposerTemplate
          className={className}
          hasRequestHistory={hasRequestHistory}
          header={
            <EVMHeader
              chainId={chainId}
              hasBlockNumber={hasBlockNumber}
              hasTitle={hasTitle}
              publicUrl={publicUrl}
            />
          }
          logger={<Logger clear={clear} logs={logs} />}
          menu={<EVMMenu group={group} />}
        />
      </CountdownContext.Provider>
    </LoggerContext.Provider>
  );
};
