import { t, tHTML } from '@ankr.com/common';
import { useMemo } from 'react';

import { Chain } from 'domains/chains/types';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { useChainSubtitleStyles } from './ChainSubtitleStyles';

export interface ChainDescriptionProps {
  chain: Chain;
  isChainArchived: boolean;
}

const checkBetaLabel = () => {
  // We will use beta label for future chains
  return false;
};

export const ChainSubtitle = ({
  chain: { coinName },
  isChainArchived,
}: ChainDescriptionProps) => {
  const { classes } = useChainSubtitleStyles();

  const hasBetaLabel = useMemo(() => checkBetaLabel(), []);

  const [label, tooltip] = hasBetaLabel
    ? [t('chains.beta'), '']
    : [t('chains.archive'), tHTML('chains.archive-tooltip-text')];

  return (
    <div className={classes.chainSubtitle}>
      <ChainRequestsLabel
        descriptionClassName={classes.description}
        description={coinName}
        descriptionColor="textSecondary"
      />
      {(isChainArchived || hasBetaLabel) && (
        <ChainLabel
          label={label}
          labelClassName={classes.archiveLabel}
          tooltip={tooltip}
        />
      )}
    </div>
  );
};
