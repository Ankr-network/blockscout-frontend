import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import {
  AddToWhitelistFormData,
  WhitelistStepFields,
} from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep, WhiteListItem } from 'domains/projects/types';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { useWhitelistStepStyles } from './useWhitelistStepStyles';
import { Table } from './components/Table/Table';
import { AddToWhitelistDialog } from './components/AddToWhitelistDialog';
import { useWhitelistData } from './useWhitelistData';
import { useProjectFormValues } from '../../hooks/useProjectFormValues';
import { EmptyList } from './components/EmptyList';
import { WhitelistItemsCounter } from './components/WhitelistItemsCounter';
import { AddWhitelistMenuButton } from './components/AddWhitelistMenuButton';

export const WhitelistStep = () => {
  const { classes } = useWhitelistStepStyles();

  const { isOpened, onClose, onOpen } = useDialog();
  const { allSelectedChainIds, whitelistItems, onChange } =
    useProjectFormValues();
  const { handleSetStepConfig } = useProjectConfig();

  const {
    data,
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
  } = useWhitelistData();

  const handleOpenAddWhitelist = useCallback(() => {
    onChange(WhitelistStepFields.isEditingWhitelistDialog, false);
    onOpen();
  }, [onChange, onOpen]);

  useOnMount(() => {
    const updatedWhitelistItems = (
      whitelistItems as AddToWhitelistFormData[]
    ).filter(item =>
      item.chains.every(chain => allSelectedChainIds.includes(chain)),
    );

    onChange(WhitelistStepFields.whitelistItems, updatedWhitelistItems);
    handleSetStepConfig(
      NewProjectStep.Whitelist,
      {
        whitelistItems: updatedWhitelistItems,
      },
      NewProjectStep.Chains,
    );
  });

  const isAddingDomainDisabled = useMemo(
    () => !isAddingDomainAllowed,
    [isAddingDomainAllowed],
  );
  const isAddingIPDisabled = useMemo(
    () => !isAddingIPAllowed,
    [isAddingIPAllowed],
  );
  const isAddingSmartContractDisabled = useMemo(
    () => !isAddingSmartContractAllowed,
    [isAddingSmartContractAllowed],
  );

  return (
    <>
      {data.length === 0 ? (
        <EmptyList
          isAddingDomainDisabled={isAddingDomainDisabled}
          isAddingIPDisabled={isAddingIPDisabled}
          isAddingSmartContractDisabled={isAddingSmartContractDisabled}
          onWhitelistDialogOpen={onOpen}
        />
      ) : (
        <>
          <Typography className={classes.title} variant="h6">
            {t('projects.new-project.step-3.title')}
          </Typography>
          <Typography variant="body2" component="p" className={classes.plug}>
            {tHTML('projects.new-project.step-3.plug')}
          </Typography>

          <div className={classes.countersWrapper}>
            <WhitelistItemsCounter type={WhiteListItem.referer} />
            <WhitelistItemsCounter type={WhiteListItem.ip} />
            <WhitelistItemsCounter type={WhiteListItem.address} />
          </div>

          <Table data={data} onWhitelistDialogOpen={onOpen} />

          <AddWhitelistMenuButton
            isSetupMode={false}
            isAddingDomainDisabled={isAddingDomainDisabled}
            isAddingIPDisabled={isAddingIPDisabled}
            isAddingSmartContractDisabled={isAddingSmartContractDisabled}
            onWhitelistDialogOpen={handleOpenAddWhitelist}
          />
        </>
      )}

      <AddToWhitelistDialog isOpen={isOpened} onClose={onClose} />
    </>
  );
};
