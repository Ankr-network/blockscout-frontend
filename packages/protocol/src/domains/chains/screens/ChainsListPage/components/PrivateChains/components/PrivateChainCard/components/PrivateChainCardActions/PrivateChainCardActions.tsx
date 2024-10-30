import { Box, Button, MenuItem } from '@mui/material';
import { Plus } from '@ankr.com/ui';

import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { CopyEndpointModal } from 'modules/chains/components/CopyEndpointModal';
import { MenuButton } from 'modules/common/components/MenuButton';
import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { GuardResolution } from 'modules/common/components/GuardResolution';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ChainProjects } from '../ChainProjects';
import { usePrivateChainsItemStyles } from '../../usePrivateChainsItemStyles';
import { privateChainCardActionsTranslation } from './translation';
import {
  IPrivateChainCardActionsProps,
  usePrivateChainCardActions,
} from './usePrivateChainCardActions';

export const PrivateChainCardActions = (
  props: IPrivateChainCardActionsProps,
) => {
  const {
    handleOpenAddToProjectsDialog,
    isAddToMetamaskButtonVisible,
    isEndpointLocked,
    open,
    projectChain,
  } = usePrivateChainCardActions(props);
  const { projectsLoading } = props;

  const {
    anchorEl,
    chain,
    chainProjects,
    filteredJwtTokens,
    handleClose,
    handleOpenChainMenu,
    isCardView,
    isChainProjectsEmpty,
  } = props;

  const { classes, cx } = usePrivateChainsItemStyles();

  const { keys, t } = useTranslation(privateChainCardActionsTranslation);

  return (
    <GuardUserGroup blockName={BlockWithPermission.ChainItem}>
      <div className={classes.privateChainActions}>
        <ChainProjects
          chainProjects={chainProjects}
          isLoadingProjects={projectsLoading}
        />
        {!isEndpointLocked && !isChainProjectsEmpty && (
          <CopyEndpointModal
            jwtTokens={filteredJwtTokens}
            chain={projectChain}
            userEndpointToken={filteredJwtTokens[0]?.userEndpointToken}
            buttonProps={{
              variant: 'outlined',
              disabled: projectsLoading,
            }}
            buttonClassName={cx(classes.privateChainCopyEndpointButton, {
              [classes.privateActionsButtonLarge]: !isCardView,
            })}
            isIconButton={isCardView}
            hasProjectSelector={filteredJwtTokens.length > 1}
          />
        )}
        {isChainProjectsEmpty && (
          <Button
            className={cx(classes.addToProjectButtonEmptyState, {
              [classes.privateActionsButtonLarge]: !isCardView,
            })}
            variant="outlined"
            size="small"
            onClick={handleOpenAddToProjectsDialog}
            startIcon={<Plus />}
            children={isCardView ? null : t(keys.addToProjectButton)}
          />
        )}
        {isAddToMetamaskButtonVisible || !isChainProjectsEmpty ? (
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
              loading: projectsLoading,
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
        ) : (
          <Box
            className={cx(classes.menuButtonPlaceholder, {
              [classes.menuButtonPlaceholderHidden]: isCardView,
            })}
          />
        )}
      </div>
    </GuardUserGroup>
  );
};
