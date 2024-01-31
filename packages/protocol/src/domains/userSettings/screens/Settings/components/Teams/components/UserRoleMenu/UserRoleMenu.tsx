import {
  Fade,
  FormControlLabel,
  Menu,
  MenuProps,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { GroupUserRole } from 'multirpc-sdk';
import { ChangeEvent } from 'react';

import { LoadableButton } from 'uiKit/LoadableButton';
import { ANKR_DOCS_TEAM_ACCESS_ROLES_LINK } from 'modules/common/constants/const';

import { useUserRoleMenuStyles } from './useUserRoleMenuStyles';

export type GroupMenuProps = Pick<MenuProps, 'anchorEl' | 'open'> & {
  onClose: () => void;
  selectedRole: GroupUserRole;
  handleRoleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isButtonDisabled: boolean;
  isLoading: boolean;
  handleUpdateRole: () => Promise<void>;
};

export const UserRoleMenu = ({
  selectedRole,
  handleRoleChange,
  isButtonDisabled,
  isLoading,
  handleUpdateRole,
  onClose,
  open,
  anchorEl,
}: GroupMenuProps) => {
  const { classes } = useUserRoleMenuStyles();

  return (
    <Menu
      PaperProps={{
        className: classes.paper,
      }}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 40,
        horizontal: 'left',
      }}
      classes={{
        list: classes.list,
      }}
      disableScrollLock
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
    >
      <div className={classes.root}>
        <Typography className={classes.title} component="p" variant="body3">
          {t('teams.update-role.title')}
        </Typography>
        <Typography
          className={classes.learnMore}
          component="p"
          color="textSecondary"
          variant="body4"
        >
          {tHTML('teams.update-role.learn-more', {
            href: ANKR_DOCS_TEAM_ACCESS_ROLES_LINK,
          })}
        </Typography>

        <RadioGroup
          value={selectedRole}
          className={classes.radioGroup}
          onChange={handleRoleChange}
        >
          <FormControlLabel
            label={t('teams.roles.admin')}
            value={GroupUserRole.admin}
            className={classes.radioItem}
            control={<Radio className={classes.radio} />}
          />
          <FormControlLabel
            label={t('teams.roles.dev')}
            value={GroupUserRole.dev}
            className={classes.radioItem}
            control={<Radio className={classes.radio} />}
          />
          <FormControlLabel
            label={t('teams.roles.finance')}
            value={GroupUserRole.finance}
            className={classes.radioItem}
            control={<Radio className={classes.radio} />}
          />
        </RadioGroup>

        <LoadableButton
          size="small"
          disabled={isButtonDisabled}
          loading={isLoading}
          onClick={handleUpdateRole}
        >
          {t('teams.update-role.submit')}
        </LoadableButton>
      </div>
    </Menu>
  );
};
