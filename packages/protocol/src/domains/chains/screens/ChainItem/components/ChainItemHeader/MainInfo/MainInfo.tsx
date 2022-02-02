import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';
import { INodeEntity } from '@ankr.com/multirpc';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './MainInfoStyles';

interface MainInfoProps {
  hasCredentials: boolean;
  icon: string;
  nodes?: INodeEntity[];
  name: string;
}

export const MainInfo = ({
  name,
  hasCredentials,
  icon,
  nodes,
}: MainInfoProps) => {
  const classes = useStyles();

  const hasArchiveNodes = useMemo(
    () => nodes?.some(item => item.isArchive),
    [nodes],
  );

  return (
    <ChainMainInfo
      logoSrc={icon}
      name={name}
      description={
        <div className={classes.description}>
          <ChainRequestsLabel
            description={name}
            descriptionColor="textSecondary"
          />
          {hasCredentials && hasArchiveNodes && (
            <TooltipWrapper
              hasIcon={false}
              tooltipText={tHTML(
                'chain-item.header.archived-node-tooltip-text',
              )}
            >
              <Typography
                className={classes.archived}
                variant="caption"
                color="textSecondary"
              >
                {t('chain-item.header.archived')}
              </Typography>
            </TooltipWrapper>
          )}
        </div>
      }
    />
  );
};
