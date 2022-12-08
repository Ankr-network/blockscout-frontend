import { Logger } from '../../Logger';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { LoggerContext } from '../const';
import { IRequestComposerMainProps } from '../RequestComposerTypes';
import { useNearRequestLogger } from './hooks/useNearRequestLogger';
import { NearHeader } from './NearHeader/NearHeader';
import { NearMenu } from './NearMenu/NearMenu';

export const NearRequestComposer = ({
  group,
  publicUrl,
  className,
}: IRequestComposerMainProps) => {
  const { clear, logger, logs } = useNearRequestLogger();

  return (
    <LoggerContext.Provider value={logger}>
      <RequestComposerTemplate
        header={<NearHeader publicUrl={publicUrl} />}
        menu={<NearMenu group={group} />}
        logger={<Logger clear={clear} logs={logs} />}
        className={className}
      />
    </LoggerContext.Provider>
  );
};
