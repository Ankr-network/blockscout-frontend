import { Button } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { NoResult } from 'modules/common/components/NoResult';

import { AccordionItem } from './components/AccordionItem/AccordionItem';
import {
  IProjectChainsAccordionProps,
  useProjectChainsAccordion,
} from './useProjectChainsAccordion';
import { projectChainsAccordion } from './translation';
import { useProjectChainsAccordionStyles } from './useProjectChainsAccordionStyles';

const IS_BUTTON_SHOW_LESS_HIDDEN = true;

export const ProjectChainsAccordion = (props: IProjectChainsAccordionProps) => {
  const {
    handleExpandButtonClick,
    hasExpandButton,
    isChainsListExpanded,
    projectChainsTabs,
    selectedProjectChainsTab,
    visibleChains,
  } = useProjectChainsAccordion(props);

  const { timeframe } = props;

  const { keys, t } = useTranslation(projectChainsAccordion);

  const { classes } = useProjectChainsAccordionStyles();

  if (!visibleChains.length) {
    return <NoResult />;
  }

  const isButtonHidden = IS_BUTTON_SHOW_LESS_HIDDEN && isChainsListExpanded;
  const isExpandButtonVisible = hasExpandButton && !isButtonHidden;

  return (
    <>
      {visibleChains.map(chain => {
        const currentTab = projectChainsTabs.find(tab => tab.id === chain.id);
        const isActive = chain.id === selectedProjectChainsTab?.id;

        return (
          <AccordionItem
            key={chain.id}
            chain={chain}
            currentTab={currentTab}
            isActive={isActive}
            timeframe={timeframe}
          />
        );
      })}
      {isExpandButtonVisible && (
        <Button
          variant="outlined"
          onClick={handleExpandButtonClick}
          className={classes.expandButton}
        >
          {isChainsListExpanded
            ? t(keys.buttonShowLess)
            : t(keys.buttonViewAll)}
        </Button>
      )}
    </>
  );
};
