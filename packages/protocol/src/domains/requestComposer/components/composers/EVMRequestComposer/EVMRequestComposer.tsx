import { EVMHeader } from './EVMHeader/EVMHeader';
import { EVMMenu } from './EVMMenu/EVMMenu';
import { Logger } from '../../Logger';
import { LoggerContext } from '../const';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { useEVMRequestLogger } from './hooks/useEVMRequestLogger';
import { IRequestComposerMainProps } from '../RequestComposerTypes';

export const EVMRequestComposer = ({
  group,
  publicUrl,
  className,
}: IRequestComposerMainProps) => {
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
