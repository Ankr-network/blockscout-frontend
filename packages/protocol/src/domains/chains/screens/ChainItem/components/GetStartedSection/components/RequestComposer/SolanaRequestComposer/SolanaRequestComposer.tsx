import { EndpointGroup } from 'modules/endpoints/types';
import { Logger } from '../components/Logger';
import { LoggerContext } from '../const';
import { RequestComposerTemplate } from '../components/RequestComposerTemplate';
import { SolanaHeader } from './SolanaHeader';
import { SolanaMenu } from './SolanaMenu';
import { useSolanaRequestLogger } from './hooks/useSolanaRequestLogger';

export interface SolanaRequestComposerProps {
  className?: string;
  group: EndpointGroup;
  url: string;
}

export const SolanaRequestComposer = ({
  className,
  group,
  url,
}: SolanaRequestComposerProps) => {
  const { clear, logger, logs } = useSolanaRequestLogger();

  return (
    <LoggerContext.Provider value={logger}>
      <RequestComposerTemplate
        className={className}
        header={<SolanaHeader url={url} />}
        logger={<Logger clear={clear} logs={logs} />}
        menu={<SolanaMenu group={group} />}
      />
    </LoggerContext.Provider>
  );
};
