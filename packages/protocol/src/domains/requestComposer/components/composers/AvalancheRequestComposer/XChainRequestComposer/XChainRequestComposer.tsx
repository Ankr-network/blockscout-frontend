import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useXChainRequestLogger } from './hooks/useXChainRequestLogger';
import { XChainMenu } from './XChainMenu';
import { Logger } from '../../../Logger';
import { RequestComposerTemplate } from '../../../RequestComposerTemplate';
import { Header } from '../../../Header';

export interface IXChainRequestComposerProps {
  group: EndpointGroup;
  className?: string;
}

export const XChainRequestComposer = ({
  group,
  className,
}: IXChainRequestComposerProps) => {
  const { clear, logs } = useXChainRequestLogger();

  return (
    <RequestComposerTemplate
      header={<Header chainName={ChainGroupID.X_CHAIN} />}
      menu={<XChainMenu group={group} />}
      logger={<Logger clear={clear} logs={logs} />}
      className={className}
    />
  );
};
