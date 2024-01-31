import { t, tHTML } from '@ankr.com/common';
import { MenuItem, Typography } from '@mui/material';
import { Select } from '@ankr.com/ui';
import { useCallback } from 'react';

import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';
import { ANKR_DOCS_TEAM_ACCOUNTS_LINK } from 'modules/common/constants/const';

import { useSelectUserStepStyles } from './useSelectUserStepStyles';
import { IUseTransferOwnershipDialogResult } from '../useTransferOwnershipDialog';
import { UserIcon } from '../UserIcon';

interface ISelectUserStepProps
  extends Pick<
    IUseTransferOwnershipDialogResult,
    'selectedUser' | 'handleSelectUser' | 'userOptions'
  > {}

export const SelectUserStep = ({
  selectedUser,
  userOptions,
  handleSelectUser,
}: ISelectUserStepProps) => {
  const { classes } = useSelectUserStepStyles();

  const renderValue = useCallback(
    (value: string) => {
      return value ? (
        <div className={classes.valueRoot} key={value}>
          <UserIcon className={classes.valueIcon} userName={value} />
          <Typography variant="body2" color="textPrimary">
            {value}
          </Typography>
        </div>
      ) : (
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.valueRoot}
        >
          {t('teams.transfer-ownership.select-step.placeholder')}
        </Typography>
      );
    },
    [classes.valueIcon, classes.valueRoot],
  );

  return (
    <>
      <Typography variant="body2" component="p" className={classes.description}>
        {tHTML('teams.transfer-ownership.select-step.description', {
          href: ANKR_DOCS_TEAM_ACCOUNTS_LINK,
        })}
      </Typography>

      <Select
        classes={{
          select: classes.select,
        }}
        fullWidth
        displayEmpty
        variant="filled"
        label={t('teams.transfer-ownership.select-step.select-label')}
        className={classes.selectRoot}
        value={selectedUser?.email || selectedUser?.address || ''}
        renderValue={renderValue}
        onChange={handleSelectUser}
      >
        {userOptions.map(({ email, address, role }) => {
          const name = email || address;

          return (
            <MenuItem key={name} value={name} className={classes.menuItem}>
              <div className={classes.optionRoot}>
                <UserIcon className={classes.valueIcon} userName={name} />

                <div>
                  <Typography component="p" variant="body2">
                    {name}
                  </Typography>
                  <Typography variant="body4" color="textSecondary">
                    {getUserRoleName(role)}
                  </Typography>
                </div>
              </div>
            </MenuItem>
          );
        })}
      </Select>

      <div className={classes.noticeRoot}>
        <Typography
          variant="subtitle2"
          component="p"
          className={classes.noticeTitle}
        >
          {t('teams.transfer-ownership.select-step.notice-title')}
        </Typography>
        <li className={classes.li}>
          <Typography variant="body3">
            {t('teams.transfer-ownership.select-step.admin-role-notice')}
          </Typography>
        </li>
        <li className={classes.li}>
          <Typography variant="body3">
            {t('teams.transfer-ownership.select-step.owner-role-notice')}
          </Typography>
        </li>
        <li className={classes.li}>
          <Typography variant="body3">
            {t('teams.transfer-ownership.select-step.transfer-notice')}
          </Typography>
        </li>
      </div>
    </>
  );
};
