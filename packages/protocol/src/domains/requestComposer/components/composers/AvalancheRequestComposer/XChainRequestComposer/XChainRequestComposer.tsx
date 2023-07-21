import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useRequestCountdown } from 'domains/requestComposer/hooks/useRequestCountdown';

import { CountdownContext } from '../../const';
import { Header } from '../../../Header';
import { Logger } from '../../../Logger';
import { RequestComposerTemplate } from '../../../RequestComposerTemplate';
import { XChainMenu } from './XChainMenu';
import { useXChainRequestLogger } from './hooks/useXChainRequestLogger';

export interface IXChainRequestComposerProps {
  className?: string;
  group: EndpointGroup;
  hasRequestHistory?: boolean;
  hasTitle?: boolean;
}

export const XChainRequestComposer = ({
  className,
  group,
  hasRequestHistory,
  hasTitle,
}: IXChainRequestComposerProps) => {
  const { clear, logs } = useXChainRequestLogger();

  const countdown = useRequestCountdown();

  return (
    <CountdownContext.Provider value={countdown}>
      <RequestComposerTemplate
        className={className}
        hasRequestHistory={hasRequestHistory}
        header={<Header chainName={ChainGroupID.X_CHAIN} hasTitle={hasTitle} />}
        logger={<Logger clear={clear} logs={logs} />}
        menu={<XChainMenu group={group} />}
      />
    </CountdownContext.Provider>
  );
};
