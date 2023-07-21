import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useRequestCountdown } from 'domains/requestComposer/hooks/useRequestCountdown';

import { CChainMenu } from './CChainMenu/CChainMenu';
import { CountdownContext } from '../../const';
import { Header } from '../../../Header';
import { Logger } from '../../../Logger';
import { RequestComposerTemplate } from '../../../RequestComposerTemplate';
import { useCChainRequestLogger } from './hooks/useCChainRequestLogger';

export interface ICChainRequestComposerProps {
  className?: string;
  group: EndpointGroup;
  hasRequestHistory?: boolean;
  hasTitle?: boolean;
}

export const CChainRequestComposer = ({
  className,
  group,
  hasRequestHistory,
  hasTitle,
}: ICChainRequestComposerProps) => {
  const { clear, logs } = useCChainRequestLogger();

  const countdown = useRequestCountdown();

  return (
    <CountdownContext.Provider value={countdown}>
      <RequestComposerTemplate
        className={className}
        hasRequestHistory={hasRequestHistory}
        header={<Header chainName={ChainGroupID.C_CHAIN} hasTitle={hasTitle} />}
        logger={<Logger clear={clear} logs={logs} />}
        menu={<CChainMenu group={group} />}
      />
    </CountdownContext.Provider>
  );
};
