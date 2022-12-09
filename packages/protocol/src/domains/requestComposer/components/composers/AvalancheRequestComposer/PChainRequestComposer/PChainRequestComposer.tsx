import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { usePChainRequestLogger } from './hooks/usePChainRequestLogger';
import { PChainMenu } from './PChainMenu';
import { Logger } from '../../../Logger';
import { RequestComposerTemplate } from '../../../RequestComposerTemplate';
import { Header } from '../../../Header';

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
