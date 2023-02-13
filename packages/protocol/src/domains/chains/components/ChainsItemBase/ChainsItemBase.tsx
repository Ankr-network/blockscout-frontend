import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { Lock } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from './components/ChainRequestsLabel';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainsItemBaseProps } from './ChainsItemBaseTypes';
import { isSuiChain, useLabelAndTooltip } from './ChainsItemBaseUtils';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useChainsItemStyles } from '../ChainsItem/useChainsItemStyles';
import { ChainsItemDialog } from '../ChainsItemDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

// TODO Refactor
export const ChainsItemBase = ({
  chain,
  description,
  isHighlighted = false,
  isLoading,
  logoSrc,
  name,
  period,
  timeframe,
  totalRequests,
  chainsItemLink,
  chainsItemButton,
  handleOriginUrlClick,
  hasPremiumDialog,
}: ChainsItemBaseProps) => {
  const { classes } = useChainsItemStyles(isHighlighted);
  const history = useHistory();
  const { label, tooltip } = useLabelAndTooltip(chain);
  const { isOpened, onOpen, onClose } = useDialog();

  const isSui = useMemo(() => isSuiChain(chain), [chain]);

  const content = useMemo(() => {
    return (
      <>
        <ChainMainInfo
          className={classes.mainInfo}
          description={
            description && (
              <ChainRequestsLabel description={description} label={period} />
            )
          }
          isHighlighted={isHighlighted}
          isLoading={isLoading}
          label={
            (chain.isArchive || isSui) && (
              <ChainLabel
                className={classes.archive}
                label={label}
                tooltip={tooltip}
              />
            )
          }
          logoSrc={logoSrc}
          name={name}
          timeframe={timeframe}
          totalRequests={totalRequests}
        />
        <div>
          <div className={classes.links}>
            {hasPremiumDialog ? (
              <Box className={classes.premiumOnlyCopyItemContainer}>
                <Typography
                  variant="subtitle1"
                  className={classes.premiumOnlyCopyItemText}
                >
                  {t('chains.for-premium-only')}
                </Typography>
                <Lock className={classes.premiumOnlyCopyItemIcon} />
              </Box>
            ) : (
              chainsItemLink
            )}
          </div>
          <div className={classes.buttonsWrapper}>
            {chainsItemButton && chainsItemButton}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              {t('chains.more-details')}
            </Button>
          </div>
        </div>
      </>
    );
  }, [
    classes,
    description,
    period,
    isHighlighted,
    chain,
    isSui,
    logoSrc,
    name,
    timeframe,
    totalRequests,
    chainsItemLink,
    chainsItemButton,
    isLoading,
    label,
    tooltip,
    hasPremiumDialog,
  ]);

  return hasPremiumDialog ? (
    <>
      <div role="button" tabIndex={0} className={classes.root} onClick={onOpen}>
        {content}
      </div>
      <ChainsItemDialog open={isOpened} onClose={onClose} />
    </>
  ) : (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOriginUrlClick}
      style={{ height: '100%' }}
    >
      <a
        role="button"
        tabIndex={0}
        onClick={() =>
          history.push(ChainsRoutesConfig.chainDetails.generatePath(chain.id))
        }
        className={classes.root}
      >
        {content}
      </a>
    </div>
  );
};
