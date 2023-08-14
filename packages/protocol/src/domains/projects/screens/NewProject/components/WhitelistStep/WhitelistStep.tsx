import { Button, Divider, Typography } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';
import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { WhitelistStepFields } from 'domains/projects/store';

import { useWhitelistStepStyles } from './useWhitelistStepStyles';
import { Table } from './components/Table/Table';
import { AddToWhitelistDialog } from './components/AddToWhitelistDialog';
import { useWhitelistData } from './useWhitelistData';
import { useProjectFormValues } from '../../hooks/useProjectFormValues';

export const WhitelistStep = () => {
  const { classes } = useWhitelistStepStyles();

  const { isOpened, onClose, onOpen } = useDialog();
  const { onChange } = useProjectFormValues();

  const {
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
  } = useWhitelistData();

  const handleOpenAddWhitelist = useCallback(() => {
    onChange(WhitelistStepFields.isEditingWhitelistDialog, false);
    onOpen();
  }, [onChange, onOpen]);

  return (
    <>
      <Typography className={classes.title} variant="h6">
        {t('projects.new-project.step-2.title')}
      </Typography>
      <Typography variant="body2" component="p" className={classes.plug}>
        {tHTML('projects.new-project.step-2.plug')}
      </Typography>

      <Table onWhitelistDialogOpen={onOpen} />

      <Button
        size="medium"
        disabled={
          !isAddingDomainAllowed &&
          !isAddingIPAllowed &&
          !isAddingSmartContractAllowed
        }
        className={classes.button}
        onClick={handleOpenAddWhitelist}
        startIcon={<Plus />}
      >
        {t('projects.new-project.step-2.btn')}
      </Button>

      <Divider />

      <AddToWhitelistDialog isOpen={isOpened} onClose={onClose} />
    </>
  );
};
