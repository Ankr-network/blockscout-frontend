import { Typography } from '@mui/material';
import React from 'react';
import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { Chain } from 'modules/chains/types';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { ChainLogo } from 'modules/chains/components/ChainLogo';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { useProjectChain } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useProjectChain';
import { useProjectChainDetails } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useProjectChainDetails';
import { ProjectConnectionSnippet } from 'domains/projects/screens/Project/components/ProjectConnectionSnippet';

import { useCodeExampleModalStyles } from './useCodeExampleModalStyles';

interface ICodeExampleModalProps {
  isOpenedCodeExample: boolean;
  onCloseCodeExample: () => void;
  onOpenCodeExample: () => void;
}

export const CodeExampleModal = ({
  isOpenedCodeExample,
  onCloseCodeExample,
  onOpenCodeExample,
}: ICodeExampleModalProps) => {
  const { projectChain } = useProjectChain();

  const {
    chainProtocolContext,
    headerContent,
    httpCode,
    privateChain: chain,
    setTechnology,
    technology,
    wssCode,
  } = useProjectChainDetails({
    projectChain,
    onOpenCodeExample,
  });

  const {
    chainSubTypeTab,
    chainSubTypeTabs,
    chainTypeTab,
    chainTypeTabs,
    groupID,
    groupTab,
    groupTabs,
    groups,
    selectGroup,
  } = headerContent.props;

  const { classes } = useCodeExampleModalStyles();

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <Dialog
        paperClassName={classes.snippetsDialogPaper}
        titleClassName={classes.snippetsDialogTitle}
        title={t('chain-item.get-started.connection-snippet.title')}
        open={isOpenedCodeExample}
        onClose={onCloseCodeExample}
      >
        <div className={classes.chainDescription}>
          <ChainLogo
            className={classes.codeExampleModalChainLogo}
            chain={chain as Chain}
          />
          <Typography variant="subtitle2" color="textPrimary">
            {chain.name}
          </Typography>
        </div>

        <ChainSelectorContent
          className={classes.chainSelectorControls}
          chainSubTypeTab={chainSubTypeTab}
          chainSubTypeTabs={chainSubTypeTabs}
          chainTypeTab={chainTypeTab}
          chainTypeTabs={chainTypeTabs}
          groupID={groupID}
          groupTab={groupTab}
          groupTabs={groupTabs}
          groups={groups}
          hasGroupSelector={false}
          selectGroup={selectGroup}
          isProtocolSwitcherHidden
          isGroupSelectorAutoWidth={false}
        />

        <ProjectConnectionSnippet
          className={classes.chainSnippets}
          hasFullWidthSnippets
          setTechnology={setTechnology}
          httpCode={httpCode}
          wssCode={wssCode}
          technology={technology}
          isHidden={!evmGroups.includes(groupID)}
          isTitleHidden
        />
      </Dialog>
    </ChainProtocolContext.Provider>
  );
};
