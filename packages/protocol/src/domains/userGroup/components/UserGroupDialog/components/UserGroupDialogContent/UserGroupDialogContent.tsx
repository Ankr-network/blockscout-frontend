import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { UserGroup } from 'multirpc-sdk';

import { useUserGroupSelect } from 'domains/userGroup/hooks/useUserGroupSelect';

import { useUserGroupDialogContentStyles } from './useUserGroupDialogContentStyles';
import { AccountList } from '../AccountList';
import { UserGroupsSkeleton } from '../UserGroupsSkeleton';

interface UserGroupDialogContentProps {
  groups: UserGroup[];
  isLoading: boolean;
}

export const UserGroupDialogContent = ({
  groups,
  isLoading,
}: UserGroupDialogContentProps) => {
  const { classes } = useUserGroupDialogContentStyles();

  const {
    handleGroupSelect,
    handleRememberChoice,
    handleSetUserGroup: handleSave,
    selectedAddress,
    shouldRemind,
  } = useUserGroupSelect(groups, isLoading);

  return (
    <>
      {isLoading ? (
        <UserGroupsSkeleton />
      ) : (
        <AccountList
          groups={groups}
          onSelect={handleGroupSelect}
          selectedGroupAddress={selectedAddress}
        />
      )}
      <Button
        fullWidth
        className={classes.button}
        onClick={handleSave}
        size="extraLarge"
        disabled={selectedAddress === undefined || isLoading}
      >
        {t('user-group.modal.button')}
      </Button>

      <FormControlLabel
        onChange={handleRememberChoice}
        label={
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.label}
          >
            {t('user-group.modal.checkbox')}
          </Typography>
        }
        control={<Checkbox size="small" checked={shouldRemind} />}
        className={classes.checkbox}
      />
    </>
  );
};
