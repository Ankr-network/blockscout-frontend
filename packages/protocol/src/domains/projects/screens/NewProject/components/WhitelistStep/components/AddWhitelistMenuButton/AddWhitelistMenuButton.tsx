import { t } from '@ankr.com/common';
import { Menu, Typography, Button } from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';
import { useCallback } from 'react';
import { useForm } from 'react-final-form';

import { useMenu } from 'modules/common/hooks/useMenu';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { MenuItem } from 'modules/common/components/MenuButton';
import { WhitelistStepFields } from 'domains/projects/store';
import { WhiteListItem } from 'domains/projects/types';

import { useAddWhitelistMenuButtonStyles } from './useAddWhitelistMenuButtonStyles';

export interface IAddWhitelistMenuButtonProps {
  isAddingDomainDisabled: boolean;
  isAddingIPDisabled: boolean;
  isAddingSmartContractDisabled: boolean;
  isSetupMode: boolean;
  className?: string;
  onWhitelistDialogOpen: () => void;
}

export const AddWhitelistMenuButton = ({
  isAddingDomainDisabled,
  isAddingIPDisabled,
  isAddingSmartContractDisabled,
  isSetupMode,
  className,
  onWhitelistDialogOpen,
}: IAddWhitelistMenuButtonProps) => {
  const { isLightTheme } = useThemes();
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const { change } = useForm();

  const { classes, cx } = useAddWhitelistMenuButtonStyles({
    isOpened: open,
    isLightTheme,
    isSetupMode,
  });

  const handleClickAddDomain = useCallback(() => {
    change(WhitelistStepFields.whitelistDialog, {
      type: WhiteListItem.referer,
    });
    onWhitelistDialogOpen();
    handleClose();
  }, [change, handleClose, onWhitelistDialogOpen]);

  const handleClickAddIp = useCallback(() => {
    change(WhitelistStepFields.whitelistDialog, {
      type: WhiteListItem.ip,
    });
    onWhitelistDialogOpen();
    handleClose();
  }, [change, handleClose, onWhitelistDialogOpen]);

  const handleClickAddSmartContract = useCallback(() => {
    change(WhitelistStepFields.whitelistDialog, {
      type: WhiteListItem.address,
    });
    onWhitelistDialogOpen();
    handleClose();
  }, [change, handleClose, onWhitelistDialogOpen]);

  const isButtonDisabled =
    isAddingDomainDisabled &&
    isAddingIPDisabled &&
    isAddingSmartContractDisabled;

  return (
    <>
      <Button
        className={cx(classes.menuButton, className, {
          [classes.disabled]: isButtonDisabled,
        })}
        onClick={handleOpen}
        disabled={isButtonDisabled}
      >
        <Typography variant="body2" className={classes.menuButtonLabel}>
          {t(
            `projects.new-project.step-3.add-whitelist-menu.${
              isSetupMode ? 'setup' : 'add'
            }`,
          )}
          <ArrowDown className={classes.menuButtonIcon} />
        </Typography>
      </Button>

      <Menu
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorOrigin={{
          vertical: isSetupMode ? 'bottom' : 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: isSetupMode ? 'top' : 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          className: classes.paper,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          disabled={isAddingDomainDisabled}
          onClick={handleClickAddDomain}
        >
          {t('projects.new-project.step-3.add-whitelist-menu.domain')}
        </MenuItem>

        <MenuItem disabled={isAddingIPDisabled} onClick={handleClickAddIp}>
          {t('projects.new-project.step-3.add-whitelist-menu.ip')}
        </MenuItem>

        <MenuItem
          disabled={isAddingSmartContractDisabled}
          onClick={handleClickAddSmartContract}
        >
          {t('projects.new-project.step-3.add-whitelist-menu.smart-contract')}
        </MenuItem>
      </Menu>
    </>
  );
};
