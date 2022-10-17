import { EndpointGroup } from 'modules/endpoints/types';
import { Logger } from '../components/Logger';
import { RequestComposerTemplate } from '../components/RequestComposerTemplate';
import { LoggerContext } from '../const';
import { useNearRequestLogger } from './hooks/useNearRequestLogger';
import { NearHeader } from './NearHeader/NearHeader';
import { NearMenu } from './NearMenu/NearMenu';

export interface IRequestComposerProps {
  group: EndpointGroup;
  publicUrl: string;
  className?: string;
}

export const NearRequestComposer = ({
  group,
  publicUrl,
  className,
}: IRequestComposerProps) => {
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
