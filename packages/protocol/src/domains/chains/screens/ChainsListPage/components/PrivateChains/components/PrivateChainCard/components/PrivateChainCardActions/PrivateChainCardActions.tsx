import { Button, MenuItem } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import React, { useCallback, useMemo } from 'react';

import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { CopyEndpointModal } from 'modules/chains/components/CopyEndpointModal';
import { MenuButton } from 'modules/common/components/MenuButton';
import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { GuardResolution } from 'modules/common/components/GuardResolution/GuardResolution';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { MappedWhitelistBlockchainsResponse } from 'domains/projects/actions/fetchWhitelistsBlockchains';
import { Chain } from 'modules/chains/types';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { hasEvmSubchains } from 'modules/chains/utils/hasEvmSubchains';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

import { ChainProjects } from '../ChainProjects';
import { usePrivateChainsItemStyles } from '../../usePrivateChainsItemStyles';
import { privateChainCardActionsTranslation } from './translation';

interface IPrivateChainCardActionsProps {
  anchorEl: null | HTMLElement;
  chain: Chain;
  chainProjects?: MappedWhitelistBlockchainsResponse[];
  filteredJwtTokens: JwtManagerToken[];
  handleClose: () => void;
  handleOpenChainMenu: (event: React.MouseEvent<HTMLElement>) => void;
  isEndpointLocked: boolean;
  isLoadingProjects: boolean;
  onOpenAddToProjectsDialog: () => void;
  open: boolean;
  isChainProjectsEmpty?: boolean;
}

export const PrivateChainCardActions = ({
  anchorEl,
  chain,
  chainProjects,
  filteredJwtTokens,
  handleClose,
  handleOpenChainMenu,
  isChainProjectsEmpty,
  isEndpointLocked,
  isLoadingProjects,
  onOpenAddToProjectsDialog,
  open,
}: IPrivateChainCardActionsProps) => {
  const { classes, cx } = usePrivateChainsItemStyles();

  const handleOpenAddToProjectsDialog = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      onOpenAddToProjectsDialog();
      handleClose();
    },
    [handleClose, onOpenAddToProjectsDialog],
  );

  const { keys, t } = useTranslation(privateChainCardActionsTranslation);

  const isAddToMetamaskButtonVisible = hasEvmSubchains(chain);

  const { tokenIndex: selectedProjectIndex } = useTokenManagerConfigSelector();

  const chainPaths = useMemo(
    () =>
      chainProjects?.find(project => project.index === selectedProjectIndex)
        ?.blockchains ?? [],
    [chainProjects, selectedProjectIndex],
  );

  const projectChain = useMemo(() => {
    if (chainPaths.length === 0) {
      return chain;
    }

    return filterChainByPaths({ chain, paths: chainPaths });
  }, [chain, chainPaths]);

  return (
    <GuardUserGroup blockName={BlockWithPermission.ChainItem}>
      <div className={classes.privateChainActions}>
        <ChainProjects
          chainProjects={chainProjects}
          isLoadingProjects={isLoadingProjects}
        />
        {!isEndpointLocked && !isChainProjectsEmpty && (
          <CopyEndpointModal
            jwtTokens={filteredJwtTokens}
            chain={projectChain}
            userEndpointToken={filteredJwtTokens[0]?.userEndpointToken}
            buttonProps={{
              variant: 'outlined',
            }}
            buttonClassName={classes.privateChainCopyEndpointButton}
            isIconButton
            hasProjectSelector={filteredJwtTokens.length > 1}
          />
        )}
        {isChainProjectsEmpty && (
          <Button
            className={classes.addToProjectButtonEmptyState}
            variant="outlined"
            size="small"
            onClick={handleOpenAddToProjectsDialog}
            startIcon={<Plus />}
          />
        )}
        {(isAddToMetamaskButtonVisible || !isChainProjectsEmpty) && (
          <MenuButton
            anchorEl={anchorEl}
            open={open}
            onOpen={handleOpenChainMenu}
            onClose={handleClose}
            buttonProps={{
              size: 'small',
              variant: 'outlined',
              className: cx(classes.chainCardBtnMore, {
                [classes.chainCardBtnMoreActive]: open,
              }),
            }}
            iconMoreClassName={classes.chainCardBtnMoreIcon}
            classes={{ paper: classes.chainCardMenuPaper }}
          >
            <MenuItem
              component={AddNetworkButton}
              chain={chain}
              size="small"
              hasChainSelector
              className={classes.privateChainAddNetworkButton}
              label={t(keys.addToMetamaskButton)}
            />
            {!isChainProjectsEmpty && (
              <GuardResolution protectedResolution="smDown">
                <GuardUserGroup blockName={BlockWithPermission.JwtManagerRead}>
                  <MenuItem
                    component={Button}
                    size="small"
                    onClick={handleOpenAddToProjectsDialog}
                    startIcon={<Plus />}
                    sx={{
                      whiteSpace: 'nowrap',
                    }}
                    children={t(keys.addToProjectButton)}
                    className={classes.privateChainAddToProjectButton}
                  />
                </GuardUserGroup>
              </GuardResolution>
            )}
          </MenuButton>
        )}
      </div>
    </GuardUserGroup>
  );
};
