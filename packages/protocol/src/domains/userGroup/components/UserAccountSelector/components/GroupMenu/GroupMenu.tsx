import {
  Button,
  Fade,
  Menu,
  MenuProps,
  Tooltip,
  Typography,
} from '@mui/material';
import { Gear, Info, Logout, OverlaySpinner, Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useHistory } from 'react-router';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { ESettingsContentType } from 'domains/userSettings/types';
import { Placeholder } from 'modules/common/components/Placeholder';
import { ScrollableContainer } from 'modules/common/components/ScrollableContainer';
import { TeamsRoutesConfig } from 'domains/teams/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import {
  selectIsGroupCreationAllowed,
  selectUserGroupLoading,
  selectUserGroups,
} from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useIsMDDown } from 'uiKit/Theme/useTheme';

import { useGroupMenuStyles } from './GroupMenuStyles';
import { GroupItem } from '../GroupItem';
import { PersonalAccountInfo } from '../PersonalAccountInfo';

export type GroupMenuProps = Pick<MenuProps, 'anchorEl' | 'open'> & {
  onClose: () => void;
};

export const GroupMenu = (props: GroupMenuProps) => {
  const groups = useAppSelector(selectUserGroups);
  const groupsLoading = useAppSelector(selectUserGroupLoading);

  const { onClose } = props;
  const { push } = useHistory();

  const isSmallScreen = useIsMDDown();

  const { classes, cx } = useGroupMenuStyles();

  const { handleSignOut } = useAuth();

  const isGroupsCreationAllowed = useAppSelector(selectIsGroupCreationAllowed);

  // > 1 because personal group is always present
  const hasGroups = groups.length > 1;

  const handleGoToSettings = useCallback(() => {
    push(
      UserSettingsRoutesConfig.settings.generatePath(
        ESettingsContentType.General,
      ),
    );
  }, [push]);

  return (
    <Menu
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 48,
        horizontal: 'right',
      }}
      classes={{
        list: classes.list,
      }}
      disableScrollLock
      slotProps={{ paper: { className: classes.paper } }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    >
      <PersonalAccountInfo onAccountButtonClick={handleGoToSettings} />
      <hr className={classes.divider} />
      <div className={classes.accountsList}>
        <Typography variant="subtitle3" pl={2}>
          {t('account-menu.accounts')}
        </Typography>
        <Placeholder
          hasPlaceholder={groupsLoading}
          placeholder={<OverlaySpinner size={30} />}
        >
          <ScrollableContainer autoHeight autoHide>
            {groups.map(group => (
              <GroupItem group={group} onSelect={onClose} key={group.address} />
            ))}
          </ScrollableContainer>
        </Placeholder>
      </div>
      {!isSmallScreen && (
        <div className={classes.accountActions}>
          {hasGroups && (
            <Button
              className={classes.actionButton}
              variant="text"
              size="small"
              startIcon={<Gear />}
              to={UserSettingsRoutesConfig.settings.generatePath(
                ESettingsContentType.Teams,
              )}
              component={Link}
            >
              {t('account-menu.manage-teams-button')}
            </Button>
          )}
          <div className={classes.createTeamButtonWrapper}>
            <Button
              className={classes.actionButton}
              variant="text"
              size="small"
              startIcon={<Plus />}
              disabled={!isGroupsCreationAllowed}
              component={Link}
              to={TeamsRoutesConfig.newTeam.generatePath()}
            >
              {t('account-menu.create-team-button')}
            </Button>
            {!isGroupsCreationAllowed && (
              <Tooltip title={t('account-menu.limit-tooltip')}>
                <Info className={classes.infoIcon} />
              </Tooltip>
            )}
          </div>
        </div>
      )}
      <div className={classes.accountMenuFooter}>
        <Button
          className={cx(classes.actionButton, classes.signOutButton)}
          startIcon={<Logout />}
          onClick={handleSignOut}
          variant="text"
          size="small"
        >
          {t('account-menu.sign-out')}
        </Button>
      </div>
    </Menu>
  );
};
