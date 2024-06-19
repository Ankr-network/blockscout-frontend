import { t } from '@ankr.com/common';
import { Button, MenuItemProps, Typography } from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';

import { AddWhitelistMenu } from 'domains/projects/components/AddWhitelistMenu';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { WhitelistStepFields } from 'domains/projects/store';
import { whitelistTypeLabelMap } from 'domains/projects/const';

import { useAddWhitelistMenuButtonStyles } from './useAddWhitelistMenuButtonStyles';

export interface IAddWhitelistMenuButtonProps {
  isAddingDomainDisabled: boolean;
  isAddingIPDisabled: boolean;
  isAddingSmartContractDisabled: boolean;
  isSetupMode: boolean;
  className?: string;
  onWhitelistDialogOpen: (type: UserEndpointTokenMode) => void;
}

export const AddWhitelistMenuButton = ({
  className,
  isAddingDomainDisabled,
  isAddingIPDisabled,
  isAddingSmartContractDisabled,
  isSetupMode,
  onWhitelistDialogOpen,
}: IAddWhitelistMenuButtonProps) => {
  const { isLightTheme } = useThemes();
  const { anchorEl, handleClose, handleOpen, open } = useMenu();

  const { change } = useForm();

  const { classes, cx } = useAddWhitelistMenuButtonStyles({
    isOpened: open,
    isLightTheme,
    isSetupMode,
  });

  const handleClickAddDomain = useCallback(() => {
    change(WhitelistStepFields.whitelistDialog, {
      type: UserEndpointTokenMode.REFERER,
    });
    onWhitelistDialogOpen(UserEndpointTokenMode.REFERER);
    handleClose();
  }, [change, handleClose, onWhitelistDialogOpen]);

  const handleClickAddIp = useCallback(() => {
    change(WhitelistStepFields.whitelistDialog, {
      type: UserEndpointTokenMode.IP,
    });
    onWhitelistDialogOpen(UserEndpointTokenMode.IP);
    handleClose();
  }, [change, handleClose, onWhitelistDialogOpen]);

  const handleClickAddSmartContract = useCallback(() => {
    change(WhitelistStepFields.whitelistDialog, {
      type: UserEndpointTokenMode.ADDRESS,
    });
    onWhitelistDialogOpen(UserEndpointTokenMode.ADDRESS);
    handleClose();
  }, [change, handleClose, onWhitelistDialogOpen]);

  const onClose = useCallback(() => handleClose(), [handleClose]);

  const menuItems = useMemo(
    (): MenuItemProps[] => [
      {
        children: t(whitelistTypeLabelMap[UserEndpointTokenMode.REFERER], {
          plurals: 1,
        }),
        disabled: isAddingDomainDisabled,
        onClick: handleClickAddDomain,
      },
      {
        children: t(whitelistTypeLabelMap[UserEndpointTokenMode.IP], {
          plurals: 1,
        }),
        disabled: isAddingIPDisabled,
        onClick: handleClickAddIp,
      },
      {
        children: t(whitelistTypeLabelMap[UserEndpointTokenMode.ADDRESS], {
          plurals: 1,
        }),
        disabled: isAddingSmartContractDisabled,
        onClick: handleClickAddSmartContract,
      },
    ],
    [
      handleClickAddDomain,
      handleClickAddIp,
      handleClickAddSmartContract,
      isAddingDomainDisabled,
      isAddingIPDisabled,
      isAddingSmartContractDisabled,
    ],
  );

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
      <AddWhitelistMenu
        anchorEl={anchorEl}
        isOpened={open}
        items={menuItems}
        location={isSetupMode ? 'bottom' : 'top'}
        onClose={onClose}
      />
    </>
  );
};
