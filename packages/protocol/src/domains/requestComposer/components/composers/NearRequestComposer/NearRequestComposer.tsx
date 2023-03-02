import { IRequestComposerMainProps } from '../RequestComposerTypes';
import { Logger } from '../../Logger';
import { LoggerContext } from '../const';
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

  return (
    <LoggerContext.Provider value={logger}>
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
    </LoggerContext.Provider>
  );
};
