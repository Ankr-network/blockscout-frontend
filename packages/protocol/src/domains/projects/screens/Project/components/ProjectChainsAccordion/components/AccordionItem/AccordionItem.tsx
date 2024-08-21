import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';

import { ChainDescription } from 'modules/chains/components/ChainDescription';

import { ProjectChainDetails } from '../../../ProjectChainDetails';
import { useProjectChainsAccordionStyles } from './useProjectChainsAccordionStyles';
import {
  IAccordionItemProps,
  useAccordionItem,
  ANIMATION_DURATION,
} from './hooks/useAccordionItem';

export const AccordionItem = ({
  chain,
  currentTab,
  isActive,
  timeframe,
  userEndpointToken,
}: IAccordionItemProps) => {
  const { elementId, handleSelect, isClosedManually, requestsString } =
    useAccordionItem({
      chain,
      currentTab,
      isActive,
      timeframe,
      userEndpointToken,
    });

  const { classes, cx } = useProjectChainsAccordionStyles();

  return (
    <>
      <Accordion
        key={chain.id}
        expanded={isClosedManually ? false : isActive}
        className={cx(classes.accordionRoot, {
          [classes.accordionRootActive]: isActive,
        })}
        TransitionProps={{
          timeout: {
            appear: 0,
            enter: ANIMATION_DURATION,
            exit: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDown />}
          className={cx(classes.accordionSummaryWrapper, {
            [classes.accordionSummaryWrapperActive]: isActive,
          })}
          onClick={handleSelect}
          id={elementId}
        >
          <div className={classes.accordionSummary}>
            <div className={classes.chainDescription}>
              <ChainDescription chain={chain} logoSize={32} isCompactView />
            </div>
            <Typography
              className={classes.chainRequestsInfo}
              variant="body3"
              color="textSecondary"
            >
              {requestsString}
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.accordionDetails}>
          {isActive && <ProjectChainDetails isCompactView />}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
