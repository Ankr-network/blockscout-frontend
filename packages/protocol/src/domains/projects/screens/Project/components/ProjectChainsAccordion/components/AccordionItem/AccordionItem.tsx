import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import React, { useCallback, useState } from 'react';

import { Chain, Timeframe } from 'modules/chains/types';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainLogo } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainLogo';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PremiumLabel } from 'modules/common/components/GetStartedSection/components/PremiumLabel';

import { ProjectChainDetails } from '../../../ProjectChainDetails';
import { useProjectChainsAccordionStyles } from './useProjectChainsAccordionStyles';
import { useChainRequests } from './hooks/useChainRequests';
import { CodeExampleModal } from '../CodeExampleModal';

interface IAccordionItemProps {
  chain: Chain;
  currentTab?: any;
  isActive?: boolean;
  timeframe: Timeframe;
}

export const AccordionItem = ({
  chain,
  currentTab,
  isActive,
  timeframe,
}: IAccordionItemProps) => {
  const { hasPremium } = useAuth();

  const { classes, cx } = useProjectChainsAccordionStyles();

  const { requestsString } = useChainRequests(chain.id, timeframe);

  const [isClosedManually, setIsClosedManually] = useState(false);

  const handleSelect = useCallback(() => {
    if (!isActive) {
      currentTab?.onSelect();
    }

    if (isClosedManually) {
      setIsClosedManually(false);

      return;
    }

    if (isActive) {
      setIsClosedManually(true);
    }
  }, [currentTab, isActive, isClosedManually]);

  const {
    isOpened: isOpenedCodeExample,
    onClose: onCloseCodeExample,
    onOpen: onOpenCodeExample,
  } = useDialog();

  return (
    <>
      <Accordion
        key={chain.id}
        expanded={isClosedManually ? false : isActive}
        className={cx(classes.accordionRoot, {
          [classes.accordionRootActive]: isActive,
        })}
      >
        <AccordionSummary
          expandIcon={<ArrowDown />}
          className={cx(classes.accordionSummaryWrapper, {
            [classes.accordionSummaryWrapperActive]: isActive,
          })}
          onClick={handleSelect}
        >
          <div className={classes.accordionSummary}>
            <div className={classes.chainDescription}>
              <ChainLogo
                className={classes.accordionChainLogo}
                chain={chain as Chain}
              />
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
