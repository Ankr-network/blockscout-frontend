import { Box, Button, Typography } from '@mui/material';
import { Close } from '@ankr.com/ui';
import React from 'react';
import { Chain } from '@ankr.com/chains-list';

import { ChainDescription } from 'modules/chains/components/ChainDescription';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { chainProjectItemTranslation } from '../../translation';
import { useChainProjectsSidebarHeaderStyles } from './useChainProjectsSidebarHeaderStyles';

interface IChainProjectsSidebarHeaderProps {
  chain: Chain;
  onCloseAddToProjectsSidebar: () => void;
  projectsCount: number;
  subchainLabels: string[];
}

export const ChainProjectsSidebarHeader = ({
  chain,
  onCloseAddToProjectsSidebar,
  projectsCount,
  subchainLabels,
}: IChainProjectsSidebarHeaderProps) => {
  const { classes } = useChainProjectsSidebarHeaderStyles();

  const { keys, t } = useTranslation(chainProjectItemTranslation);

  return (
    <>
      <Box className={classes.chainNavbarHeader}>
        <Typography variant="h6">{t(keys.dialogTitle)}</Typography>
        <Button
          variant="outlined"
          className={classes.closeButton}
          onClick={onCloseAddToProjectsSidebar}
        >
          <Close />
        </Button>
      </Box>
      <Typography variant="body2" color="textSecondary">
        {t(keys.selectProjects)}
      </Typography>
      <ChainDescription
        chain={chain}
        logoSize={40}
        className={classes.chainProjectsDialogDescription}
        isCompactView
        subchainLabels={subchainLabels}
      />
      <Typography
        variant="subtitle1"
        className={classes.chainProjectsTitle}
        component="p"
        color="textSecondary"
      >
        {t(keys.projects, { plurals: projectsCount })}
      </Typography>
    </>
  );
};
