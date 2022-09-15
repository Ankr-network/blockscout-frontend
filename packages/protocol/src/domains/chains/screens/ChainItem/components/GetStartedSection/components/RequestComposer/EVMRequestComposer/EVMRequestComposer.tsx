import { EndpointGroup } from 'modules/endpoints/types';
import { EVMHeader } from './EVMHeader/EVMHeader';
import { useEVMRequestLogger } from './hooks/useEVMRequestLogger';
import { Logger } from '../components/Logger';
import { EVMMenu } from './EVMMenu/EVMMenu';
import { RequestComposerTemplate } from '../components/RequestComposerTemplate';

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
  const { clear, logs } = useEVMRequestLogger();

  return (
    <RequestComposerTemplate
      header={<EVMHeader publicUrl={publicUrl} />}
      menu={<EVMMenu group={group} />}
      logger={<Logger clear={clear} logs={logs} />}
      className={className}
    />
  );
};
