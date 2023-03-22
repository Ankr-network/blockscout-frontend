import { useMemo } from 'react';

import { HarmonyHeader } from './HarmonyHeader';
import { HarmonyLibraryID } from 'domains/requestComposer/constants/harmony';
import { HarmonyMenu } from './HarmonyMenu';
import { IRequestComposerMainProps } from '../RequestComposerTypes';
import { Logger } from '../../Logger';
import { CountdownContext, LoggerContext } from '../const';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { useEVMRequestLogger } from '../EVMRequestComposer/hooks/useEVMRequestLogger';
import { useHarmonyChainRequestLogger } from './hooks/useHarmonyChainRequestLogger';
import { useLibraryTabs } from './HarmonyMenu/MenuTabsUtils';
import { useRequestCountdown } from 'domains/requestComposer/hooks/useRequestCountdown';

export const HarmonyRequestComposer = ({
  className,
  group,
  hasBlockNumber,
  hasRequestHistory,
  hasTitle,
  publicUrl,
}: IRequestComposerMainProps) => {
  const { clear, logger, logs } = useEVMRequestLogger();
  const {
    clear: harmonyClear,
    logger: harmonyLogger,
    logs: harmonyLogs,
  } = useHarmonyChainRequestLogger();

  const [tabs, selectedTab] = useLibraryTabs(group);

  const isHarmonyMethod = useMemo(
    () => selectedTab?.id === HarmonyLibraryID.Harmony,
    [selectedTab],
  );

  const countdown = useRequestCountdown();

  return (
    <LoggerContext.Provider value={isHarmonyMethod ? harmonyLogger : logger}>
      <CountdownContext.Provider value={countdown}>
        <RequestComposerTemplate
          className={className}
          hasRequestHistory={hasRequestHistory}
          header={
            <HarmonyHeader
              chainName={isHarmonyMethod ? HarmonyLibraryID.Harmony : undefined}
              hasBlockNumber={hasBlockNumber}
              hasTitle={hasTitle}
              publicUrl={publicUrl}
            />
          }
          logger={
            <Logger
              clear={isHarmonyMethod ? harmonyClear : clear}
              logs={isHarmonyMethod ? harmonyLogs : logs}
            />
          }
          menu={<HarmonyMenu tabs={tabs} selectedTab={selectedTab} />}
        />
      </CountdownContext.Provider>
    </LoggerContext.Provider>
  );
};
