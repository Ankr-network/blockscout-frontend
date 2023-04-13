import { t, tHTML } from '@ankr.com/common';
import { useMemo } from 'react';

import { ChainID } from 'modules/chains/types';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useChainSubtitleStyles } from './ChainSubtitleStyles';

export interface ChainDescriptionProps {
  chain: IApiChain;
  isChainArchived: boolean;
}

const checkBetaLabel = (id: ChainID) => {
  return id === ChainID.SUI || id === ChainID.ROLLUX;
};

export const ChainSubtitle = ({
  chain: { coinName, id },
  isChainArchived,
}: ChainDescriptionProps) => {
  const { classes } = useChainSubtitleStyles();

  const hasBetaLabel = useMemo(() => checkBetaLabel(id), [id]);

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
