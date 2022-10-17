import { Logger } from '../components/Logger';
import { useHarmonyChainRequestLogger } from './hooks/useHarmonyChainRequestLogger';
import { useEVMRequestLogger } from '../EVMRequestComposer/hooks/useEVMRequestLogger';
import { IRequestComposerProps } from '../AvalancheRequestComposer';
import { RequestComposerTemplate } from '../components/RequestComposerTemplate';
import { LoggerContext } from '../const';
import { EVMHeader } from '../EVMRequestComposer/EVMHeader/EVMHeader';
import { HarmonyMenu } from './HarmonyMenu';
import { useLibraryTabs } from './HarmonyMenu/MenuTabsUtils';
import { useMemo } from 'react';
import { HarmonyLibraryID } from 'domains/requestComposer/constants/harmony';

export const HarmonyRequestComposer = ({
  group,
  publicUrl,
  className,
}: IRequestComposerProps) => {
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
        header={<EVMHeader publicUrl={publicUrl} />}
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
