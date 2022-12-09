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
  publicUrl?: string;
}

export const SolanaRequestComposer = ({
  className,
  group,
  publicUrl,
}: SolanaRequestComposerProps) => {
  const { clear, logger, logs } = useSolanaRequestLogger();

  return (
    <LoggerContext.Provider value={logger}>
      <RequestComposerTemplate
        className={className}
        header={<SolanaHeader publicUrl={publicUrl} />}
        logger={<Logger clear={clear} logs={logs} />}
        menu={<SolanaMenu group={group} />}
      />
    </LoggerContext.Provider>
  );
};
