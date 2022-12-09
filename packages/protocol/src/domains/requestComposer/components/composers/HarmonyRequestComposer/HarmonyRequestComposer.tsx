import { useMemo } from 'react';
import { Logger } from '../../Logger';
import { useHarmonyChainRequestLogger } from './hooks/useHarmonyChainRequestLogger';
import { useEVMRequestLogger } from '../EVMRequestComposer/hooks/useEVMRequestLogger';
import { RequestComposerTemplate } from '../../RequestComposerTemplate';
import { LoggerContext } from '../const';
import { HarmonyHeader } from './HarmonyHeader';
import { HarmonyMenu } from './HarmonyMenu';
import { useLibraryTabs } from './HarmonyMenu/MenuTabsUtils';
import { HarmonyLibraryID } from 'domains/requestComposer/constants/harmony';
import { IRequestComposerMainProps } from '../RequestComposerTypes';

export const HarmonyRequestComposer = ({
  group,
  publicUrl,
  className,
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

  return (
    <LoggerContext.Provider value={isHarmonyMethod ? harmonyLogger : logger}>
      <RequestComposerTemplate
        header={
          <HarmonyHeader
            publicUrl={publicUrl}
            chainName={isHarmonyMethod ? HarmonyLibraryID.Harmony : undefined}
          />
        }
        menu={<HarmonyMenu tabs={tabs} selectedTab={selectedTab} />}
        logger={
          <Logger
            clear={isHarmonyMethod ? harmonyClear : clear}
            logs={isHarmonyMethod ? harmonyLogs : logs}
          />
        }
        className={className}
      />
    </LoggerContext.Provider>
  );
};
