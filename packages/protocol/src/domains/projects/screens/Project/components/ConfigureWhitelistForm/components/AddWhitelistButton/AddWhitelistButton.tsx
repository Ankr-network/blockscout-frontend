import { ArrowDown } from '@ankr.com/ui';
import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { AddWhitelistMenu } from 'domains/projects/components/AddWhitelistMenu';
import { useMenu } from 'modules/common/hooks/useMenu';

import { useAddWhitelistButtonStyles } from './useAddWhitelistButtonStyles';
import {
  UseWhitelistMenuItemsParams,
  useWhitelistMenuItems,
} from './hooks/useAddWhitelistMenuItems';

export interface AddWhitelistButtonProps extends UseWhitelistMenuItemsParams {
  className?: string;
  iconClassName?: string;
}

export const AddWhitelistButton = ({
  className,
  iconClassName,
  setAddDomainContent,
  setAddIPContent,
  setAddSmartContractContent,
  whitelist,
}: AddWhitelistButtonProps) => {
  const { anchorEl, handleClose, handleOpen, open: isOpened } = useMenu();
  const { isDisabled, items } = useWhitelistMenuItems({
    setAddDomainContent,
    setAddIPContent,
    setAddSmartContractContent,
    whitelist,
  });

  const { classes, cx } = useAddWhitelistButtonStyles(isOpened);

  return (
    <>
      <Button
        className={cx(classes.button, className)}
        classes={{
          endIcon: cx(classes.endIcon, iconClassName),
        }}
        disabled={isDisabled}
        endIcon={<ArrowDown />}
        onClick={handleOpen}
        variant="contained"
      >
        {t('project.configure-whitelist-form.add-whitelist-button')}
      </Button>
      <AddWhitelistMenu
        anchorEl={anchorEl}
        isOpened={isOpened}
        items={items}
        onClose={handleClose}
      />
    </>
  );
};
