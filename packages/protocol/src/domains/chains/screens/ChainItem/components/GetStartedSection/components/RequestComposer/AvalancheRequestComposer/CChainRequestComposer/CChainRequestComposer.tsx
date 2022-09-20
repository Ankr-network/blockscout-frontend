import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useCChainRequestLogger } from './hooks/useCChainRequestLogger';
import { CChainMenu } from './CChainMenu/CChainMenu';
import { Logger } from '../../components/Logger';
import { RequestComposerTemplate } from '../../components/RequestComposerTemplate';
import { Header } from '../../components/Header';

export interface ICChainRequestComposerProps {
  group: EndpointGroup;
  className?: string;
}

export const CChainRequestComposer = ({
  group,
  className,
}: ICChainRequestComposerProps) => {
  const { clear, logs } = useCChainRequestLogger();

  return (
    <RequestComposerTemplate
      header={<Header chainName={ChainGroupID.C_CHAIN} />}
      menu={<CChainMenu group={group} />}
      logger={<Logger clear={clear} logs={logs} />}
      className={className}
    />
  );
};
