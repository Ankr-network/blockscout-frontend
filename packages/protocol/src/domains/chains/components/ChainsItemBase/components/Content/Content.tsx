import { Buttons } from '../Buttons';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { ContentProps } from './types';
import { Label } from '../Label';
import { Links } from '../Links';
import { useContentStyles } from './ContentStyles';
import { useMemo } from 'react';
import { t, tHTML } from '@ankr.com/common';

const useLabel = (isSui: boolean, isComingSoon: boolean) => {
  return useMemo(() => {
    if (isSui) {
      return [t('chains.beta'), ''];
    }

    if (isComingSoon) {
      return [t('chains.soon'), ''];
    }

    return [t('chains.archive'), tHTML('chains.archive-tooltip-text')];
  }, [isComingSoon, isSui]);
};

const useInactiveMessage = (
  hasPremiumDialog: boolean,
  isComingSoon: boolean,
) => {
  if (hasPremiumDialog) {
    return t('chains.for-premium-only');
  }

  if (isComingSoon) {
    return t('chains.coming-soon');
  }

  return undefined;
};

export const Content = ({
  chainsItemButton,
  chainsItemLink,
  description,
  hasPremiumDialog,
  isArchive,
  isHighlighted,
  isLoading,
  isSui,
  logoSrc,
  name,
  period,
  timeframe,
  totalRequests,
  isComingSoon,
  hasTotalRequestsLabel,
}: ContentProps) => {
  const hasLabel = isArchive || isSui || isComingSoon;

  const [label, tooltip] = useLabel(isSui, isComingSoon);

  const { classes } = useContentStyles();

  const inactiveMessage = useInactiveMessage(!!hasPremiumDialog, isComingSoon);

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
          hasLabel && (
            <Label
              label={label}
              tooltip={tooltip}
              isStatusIndicatorVisible={!isComingSoon}
            />
          )
        }
        logoSrc={logoSrc}
        name={name}
        timeframe={timeframe}
        totalRequests={totalRequests}
        hasTotalRequestsLabel={hasTotalRequestsLabel}
      />
      <Links inactiveMessage={inactiveMessage}>{chainsItemLink}</Links>
      <Buttons>{chainsItemButton}</Buttons>
    </>
  );
};
