import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainLogo } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainLogo';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { PremiumLabel } from 'modules/common/components/GetStartedSection/components/PremiumLabel';
import { useDialog } from 'modules/common/hooks/useDialog';

import { ProjectChainDetails } from '../../../ProjectChainDetails';
import { useProjectChainsAccordionStyles } from './useProjectChainsAccordionStyles';
import { CodeExampleModal } from '../CodeExampleModal';
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
}: IAccordionItemProps) => {
  const {
    isOpened: isOpenedCodeExample,
    onClose: onCloseCodeExample,
    onOpen: onOpenCodeExample,
  } = useDialog();

  const {
    elementId,
    handleSelect,
    hasPremium,
    isClosedManually,
    requestsString,
  } = useAccordionItem({
    chain,
    currentTab,
    isActive,
    timeframe,
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
              <ChainLogo className={classes.accordionChainLogo} chain={chain} />
              <div className={classes.accordionLabelWrapper}>
                <div className={classes.accordionLabel}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className={classes.chainNameWrapper}
                  >
                    {chain.name}

                    {chain.premiumOnly && !hasPremium && (
                      <PremiumLabel
                        size="xs"
                        hasGradientBackground
                        className={classes.accordionPremiumLabel}
                        label="Premium only"
                      />
                    )}

                    {chain.isArchive && (
                      <ChainLabel
                        className={classes.chainArchiveLabel}
                        isCheckIconVisible
                        label={t('chains.archive')}
                        labelClassName={classes.chainArchiveLabelText}
                      />
                    )}
                  </Typography>
                  <div className={classes.chainLabelBottom}>
                    <ChainRequestsLabel
                      className={classes.coinName}
                      description={chain.coinName}
                      descriptionColor="textSecondary"
                    />
                  </div>
                </div>
              </div>
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
          {isActive && (
            <ProjectChainDetails
              isCompactView
              onOpenCodeExample={onOpenCodeExample}
            />
          )}
        </AccordionDetails>
      </Accordion>

      <CodeExampleModal
        onOpenCodeExample={onOpenCodeExample}
        isOpenedCodeExample={isOpenedCodeExample}
        onCloseCodeExample={onCloseCodeExample}
      />
    </>
  );
};
