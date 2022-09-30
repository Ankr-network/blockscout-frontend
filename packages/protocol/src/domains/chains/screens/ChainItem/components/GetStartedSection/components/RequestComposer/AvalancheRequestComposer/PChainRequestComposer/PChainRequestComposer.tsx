import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { usePChainRequestLogger } from './hooks/usePChainRequestLogger';
import { PChainMenu } from './PChainMenu';
import { Logger } from '../../components/Logger';
import { RequestComposerTemplate } from '../../components/RequestComposerTemplate';
import { Header } from '../../components/Header';

export interface IPChainRequestComposerProps {
  group: EndpointGroup;
  className?: string;
}

export const PChainRequestComposer = ({
  group,
  className,
}: IPChainRequestComposerProps) => {
  const { clear, logs } = usePChainRequestLogger();

  return (
    <RequestComposerTemplate
      header={<Header chainName={ChainGroupID.P_CHAIN} />}
      menu={<PChainMenu group={group} />}
      logger={<Logger clear={clear} logs={logs} />}
      className={className}
    />
  );
};
