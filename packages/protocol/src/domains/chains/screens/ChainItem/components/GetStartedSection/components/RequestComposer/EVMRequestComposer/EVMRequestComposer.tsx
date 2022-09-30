import { EVMHeader } from './EVMHeader/EVMHeader';
import { EVMMenu } from './EVMMenu/EVMMenu';
import { EndpointGroup } from 'modules/endpoints/types';
import { Logger } from '../components/Logger';
import { LoggerContext } from '../const';
import { RequestComposerTemplate } from '../components/RequestComposerTemplate';
import { useEVMRequestLogger } from './hooks/useEVMRequestLogger';

export interface IRequestComposerProps {
  group: EndpointGroup;
  publicUrl: string;
  className?: string;
}

export const EVMRequestComposer = ({
  group,
  publicUrl,
  className,
}: IRequestComposerProps) => {
  const { clear, logger, logs } = useEVMRequestLogger();

  return (
    <LoggerContext.Provider value={logger}>
      <RequestComposerTemplate
        header={<EVMHeader publicUrl={publicUrl} />}
        menu={<EVMMenu group={group} />}
        logger={<Logger clear={clear} logs={logs} />}
        className={className}
      />
    </LoggerContext.Provider>
  );
};
