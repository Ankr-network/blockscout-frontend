import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Header } from '../../../Header';
import { Logger } from '../../../Logger';
import { PChainMenu } from './PChainMenu';
import { RequestComposerTemplate } from '../../../RequestComposerTemplate';
import { usePChainRequestLogger } from './hooks/usePChainRequestLogger';

export interface IPChainRequestComposerProps {
  className?: string;
  group: EndpointGroup;
  hasRequestHistory?: boolean;
  hasTitle?: boolean;
}

export const PChainRequestComposer = ({
  className,
  group,
  hasRequestHistory,
  hasTitle,
}: IPChainRequestComposerProps) => {
  const { clear, logs } = usePChainRequestLogger();

  return (
    <RequestComposerTemplate
      className={className}
      hasRequestHistory={hasRequestHistory}
      header={<Header chainName={ChainGroupID.P_CHAIN} hasTitle={hasTitle} />}
      logger={<Logger clear={clear} logs={logs} />}
      menu={<PChainMenu group={group} />}
    />
  );
};
