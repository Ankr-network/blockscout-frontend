import { Button, Divider, Typography } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';

import { useDialog } from 'modules/common/hooks/useDialog';

import { useWhitelistStepStyles } from './useWhitelistStepStyles';
import { Table } from './components/Table/Table';
import { AddToWhitelistDialog } from './components/AddToWhitelistDialog';
import { useWhitelistData } from './useWhitelistData';

export const WhitelistStep = () => {
  const { classes } = useWhitelistStepStyles();

  const { isOpened, onClose, onOpen } = useDialog();

  const {
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
  } = useWhitelistData();

  return (
    <>
      <Typography className={classes.title} variant="h6">
        {t('projects.new-project.step-2.title')}
      </Typography>
      <Typography variant="body2" component="p" className={classes.plug}>
        {tHTML('projects.new-project.step-2.plug')}
      </Typography>

      <Table />

      <Button
        size="medium"
        disabled={
          !isAddingDomainAllowed &&
          !isAddingIPAllowed &&
          !isAddingSmartContractAllowed
        }
        className={classes.button}
        onClick={onOpen}
        startIcon={<Plus />}
      >
        {t('projects.new-project.step-2.btn')}
      </Button>

      <Divider />

      <AddToWhitelistDialog isOpen={isOpened} onClose={onClose} />
    </>
  );
};
