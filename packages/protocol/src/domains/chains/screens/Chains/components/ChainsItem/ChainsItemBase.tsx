import { Box, Button, Typography } from '@material-ui/core';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainsItemBaseProps } from './ChainsItemTypes';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { t } from 'modules/i18n/utils/intl';
import { useChainsItem } from '../../hooks/useChainsItem';
import { useChainsItemStyles } from './useChainsItemStyles';
import { ChainsItemDialog } from './ChainsItemDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useCallback, useMemo } from 'react';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ReactComponent as LockIcon } from 'uiKit/Icons/lock.svg';
import { useHistory } from 'react-router-dom';

export const ChainsItemBase = ({
  chain,
  description,
  isHighlighted = false,
  isLoading,
  isPremium,
  logoSrc,
  name,
  period,
  timeframe,
  totalRequests,
  chainsItemLink,
  chainsItemButton,
  handleOriginUrlClick,
}: ChainsItemBaseProps) => {
  const classes = useChainsItemStyles(isHighlighted);
  const history = useHistory();

  const { label, isSui, tooltip } = useChainsItem(chain, isPremium);

  const { isOpened, onOpen, onClose } = useDialog();

  const handleClick = useCallback(() => onOpen(), [onOpen]);

  const { credentials } = useAuth();

  const isShowPremiumDialog = useMemo(
    () => !credentials && chain.premiumOnly,
    [chain, credentials],
  );

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
        <div className={classes.bottom}>
          <div className={classes.links}>
            {isShowPremiumDialog ? (
              <Box className={classes.premiumOnlyCopyItemContainer}>
                <Typography
                  variant="subtitle1"
                  className={classes.premiumOnlyCopyItemText}
                >
                  {t('chains.for-premium-only')}
                </Typography>
                <LockIcon className={classes.premiumOnlyCopyItemIcon} />
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
    isShowPremiumDialog,
  ]);

  return isShowPremiumDialog ? (
    <>
      <div
        role="button"
        tabIndex={0}
        className={classes.root}
        onClick={handleClick}
      >
        {content}
      </div>
      <ChainsItemDialog
        name={name}
        open={isOpened}
        logoSrc={logoSrc}
        onClose={onClose}
      />
    </>
  ) : (
    <div role="button" tabIndex={0} onClick={handleOriginUrlClick}>
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
