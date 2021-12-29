import { Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import classNames from 'classnames';
import { useCurrentNetwork } from 'modules/common/hooks/useCurrentNetwork';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { useNoCrowdloanStyles } from './useNoCrowdloanStyles';

interface INoCrowdloanProps {
  classRoot?: string;
  type?: ENoCrowdloanTypes;
}

export enum ENoCrowdloanTypes {
  MyRewards = 'MY_REWARDS',
  ProjectsList = 'PROJECTS_LIST',
}

const ICONS_MAP = {
  [EParachainPolkadotNetwork.DOT]: DotIcon,
  [EParachainPolkadotNetwork.KSM]: KsmIcon,
  [EParachainPolkadotNetwork.WND]: DotIcon,
  [EParachainPolkadotNetwork.ROC]: DotIcon,
};

export const NoCrowdloan = ({
  classRoot,
  type = ENoCrowdloanTypes.ProjectsList,
}: INoCrowdloanProps) => {
  const classes: ClassNameMap = useNoCrowdloanStyles();
  const network: EParachainPolkadotNetwork = useCurrentNetwork<EParachainPolkadotNetwork>().toUpperCase() as EParachainPolkadotNetwork;
  const Icon = ICONS_MAP[network];

  if (typeof Icon === 'undefined') {
    return null;
  }

  return (
    <div className={classNames(classes.root, classRoot)}>
      <div className={classes.cardArea}>
        <Icon className={classes.cardLogo} />

        <Typography className={classes.cardMessage} variant="h4">
          {t('polkadot-slot-auction.no-crowdloan.message', {
            type: t(`polkadot-slot-auction.no-crowdloan.types.${type}`),
            tokenName: t(`stake-polkadot.networks.${network}`),
          })}
        </Typography>

        <Typography
          className={classes.cardSubMessage}
          color="textSecondary"
          variant="subtitle2"
        >
          {t('polkadot-slot-auction.no-crowdloan.sub-message')}
        </Typography>
      </div>
    </div>
  );
};
