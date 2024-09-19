import { Typography } from '@mui/material';
import React from 'react';
import { t } from '@ankr.com/common';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { Dialog } from 'uiKit/Dialog';
import { evmGroups } from 'modules/endpoints/constants/evmGroups';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { ChainLogo } from 'modules/chains/components/ChainLogo';
import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { useProjectChainDetails } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useProjectChainDetails';
import { ProjectConnectionSnippet } from 'domains/projects/screens/Project/components/ProjectConnectionSnippet';
import { MultichainCodeSampleWrapper } from 'domains/chains/screens/ChainPage/components/ChainItemHeader/components/MultichainCodeSampleWrapper';

import { useCodeExampleModalStyles } from './useCodeExampleModalStyles';

interface ICodeExampleModalProps {
  isOpenedCodeExample: boolean;
  onCloseCodeExample: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  chain: Chain;
}

export const CodeExampleModal = ({
  chain,
  isOpenedCodeExample,
  onCloseCodeExample,
}: ICodeExampleModalProps) => {
  const {
    chainProtocolContext,
    chainSubTypeTab,
    chainSubTypeTabs,
    chainTypeTab,
    chainTypeTabs,
    groupID,
    groupTab,
    groupTabs,
    groups,
    httpCode,
    selectGroup,
    setTechnology,
    technology,
    wssCode,
  } = useProjectChainDetails({
    projectChain: chain,
  });

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
            chain={chain}
          />
          <Typography variant="subtitle2" color="textPrimary">
            {chain.name}
          </Typography>
        </div>

        {chain.id === ChainID.MULTICHAIN ? (
          <MultichainCodeSampleWrapper url={chain.urls[0].rpc} />
        ) : (
          <>
            <ChainSelectorContent
              className={classes.chainSelectorControls}
              classNameSelector={classes.chainSelectorContent}
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
          </>
        )}
      </Dialog>
    </ChainProtocolContext.Provider>
  );
};
