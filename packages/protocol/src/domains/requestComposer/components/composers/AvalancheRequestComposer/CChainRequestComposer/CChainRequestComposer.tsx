import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useCChainRequestLogger } from './hooks/useCChainRequestLogger';
import { CChainMenu } from './CChainMenu/CChainMenu';
import { Logger } from '../../../Logger';
import { RequestComposerTemplate } from '../../../RequestComposerTemplate';
import { Header } from '../../../Header';

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
